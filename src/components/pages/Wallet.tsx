"use client";

import { useState } from 'react';
import { EyeOff, Eye, Wallet as WalletIcon } from 'lucide-react';
import { useGetWallet } from '@/hooks/useWallet';
import { Skeleton } from "@/components/ui/skeleton";
import { Transaction } from '@/types';

const Wallet = () => {
    const { data, isLoading } = useGetWallet();
    const [showBalance, setShowBalance] = useState(true);

    const balance = data?.balance || 0;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    return (
        <div className="max-w-md mx-auto min-h-screen bg-background">
            {isLoading ? (
                /* Enhanced Skeleton Loader */
                <div className="py-8 my-6 md:my-10 px-4 space-y-12">
                    {/* Balance Skeleton */}
                    <div className="flex flex-col items-center space-y-3">
                        <Skeleton className="h-4 w-28 bg-muted" />
                        <Skeleton className="h-12 w-48 bg-muted" />
                    </div>

                    {/* Transactions Skeleton */}
                    <div className="space-y-6">
                        <Skeleton className="h-6 w-40 bg-muted mb-4" />
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Skeleton className="h-12 w-12 rounded-full bg-muted" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-32 bg-muted" />
                                        <Skeleton className="h-3 w-24 bg-muted" />
                                    </div>
                                </div>
                                <Skeleton className="h-5 w-16 bg-muted" />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="font-sans text-foreground border rounded-md py-8 my-6 md:my-10">
                    
                    {/* Balance Section */}
                    <section className="text-center px-4">
                        <p className="text-foreground font-medium mb-2">Your Balance</p>
                        <div className="flex items-center justify-center gap-3">
                            <span className="text-4xl font-semibold text-header">
                                {showBalance ? `$${balance.toFixed(2)}` : "****"}
                            </span>
                            <button
                                onClick={() => setShowBalance(!showBalance)}
                                className="text-muted-foreground hover:text-foreground transition-colors p-1"
                            >
                                {showBalance ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                            </button>
                        </div>
                    </section>

                    {/* Latest Transactions */}
                    <section className="mt-12 px-5">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-semibold">Latest Transactions</h2>
                        </div>

                        <div className="space-y-4">
                            {data?.transactions?.length > 0 ? (
                                data?.transactions?.map((tx: Transaction) => (
                                    <div key={tx._id} className="flex items-center justify-between py-2 group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                                                <WalletIcon className={`w-6 h-6 ${tx.status === 'failed' ? 'text-muted-foreground' : 'text-[#00D1A0]'}`} />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-foreground text-base">
                                                    {tx.status === 'failed'
                                                        ? 'Transaction Failed'
                                                        : tx.type === 'credit'
                                                            ? 'Wallet Credited'
                                                            : 'Wallet Debited'}
                                                </h3>
                                                <p className="text-xs text-muted-foreground font-medium">
                                                    {formatDate(tx.createdAt)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className={`font-medium text-base ${tx.status === 'failed' || tx.type === 'debit'
                                                ? 'text-destructive'
                                                : 'text-foreground'
                                                }`}>
                                                {tx.status !== 'failed' && (tx.type === 'credit' ? '+' : '-')}
                                                ${tx.amount.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10">
                                    <p className="text-muted-foreground text-sm">No transactions found</p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
};

export default Wallet;
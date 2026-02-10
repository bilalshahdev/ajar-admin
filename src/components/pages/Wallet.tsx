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
        <div className="max-w-md mx-auto min-h-screen bg-white">
            {isLoading ? (
                /* Enhanced Skeleton Loader */
                <div className="py-8 my-6 md:my-10 px-4 space-y-12">
                    {/* Balance Skeleton */}
                    <div className="flex flex-col items-center space-y-3">
                        <Skeleton className="h-4 w-28 bg-gray-100" />
                        <Skeleton className="h-12 w-48 bg-gray-100" />
                    </div>

                    {/* Transactions Skeleton */}
                    <div className="space-y-6">
                        <Skeleton className="h-6 w-40 bg-gray-100 mb-4" />
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Skeleton className="h-12 w-12 rounded-full bg-gray-100" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-32 bg-gray-100" />
                                        <Skeleton className="h-3 w-24 bg-gray-100" />
                                    </div>
                                </div>
                                <Skeleton className="h-5 w-16 bg-gray-100" />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="font-sans text-slate-900 border rounded-md py-8 my-6 md:my-10">
                    
                    {/* Balance Section */}
                    <section className="text-center px-4">
                        <p className="text-gray-900 font-medium mb-2">Your Balance</p>
                        <div className="flex items-center justify-center gap-3">
                            <span className="text-4xl font-semibold text-header">
                                {showBalance ? `$${balance.toFixed(2)}` : "****"}
                            </span>
                            <button
                                onClick={() => setShowBalance(!showBalance)}
                                className="text-slate-400 hover:text-slate-600 transition-colors p-1"
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
                                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                                <WalletIcon className={`w-6 h-6 ${tx.status === 'failed' ? 'text-slate-400' : 'text-[#00D1A0]'}`} />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-slate-800 text-base">
                                                    {tx.status === 'failed'
                                                        ? 'Transaction Failed'
                                                        : tx.type === 'credit'
                                                            ? 'Wallet Credited'
                                                            : 'Wallet Debited'}
                                                </h3>
                                                <p className="text-xs text-slate-400 font-medium">
                                                    {formatDate(tx.createdAt)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className={`font-medium text-base ${tx.status === 'failed' || tx.type === 'debit'
                                                ? 'text-red-500'
                                                : 'text-slate-900'
                                                }`}>
                                                {tx.status !== 'failed' && (tx.type === 'credit' ? '+' : '-')}
                                                ${tx.amount.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10">
                                    <p className="text-slate-400 text-sm">No transactions found</p>
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
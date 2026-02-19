"use client"

import { Clock, BellOff } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useNotification } from "@/hooks/useNotification"
import Link from 'next/link'
import type { Notification } from '@/types'
import { timeAgo } from '@/utils/timeAgo'

const Notification = () => {
    const { data: notifications, isLoading } = useNotification();

    return (
        <div className="min-h-screen">
            {
                isLoading ?
                    <div className="max-w-2xl mx-auto p-6 space-y-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="flex gap-4 p-4 border rounded-2xl bg-card shadow-sm">
                                <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                                <div className="space-y-2 w-full">
                                    <Skeleton className="h-4 w-1/3" />
                                    <Skeleton className="h-3 w-full" />
                                    <Skeleton className="h-3 w-20" />
                                </div>
                            </div>
                        ))}
                    </div> :
                    <div className="max-w-2xl mx-auto p-">
                        <div className="space-y-3">
                            {notifications && notifications.length > 0 ? (
                                notifications.map((item: Notification) => (
                                    <Link
                                        key={item._id}
                                        href={`#`}
                                        className="block group"
                                    >
                                        <Card className={`border-none shadow-sm rounded-2xl transition-all duration-200 group-hover:shadow-md ${!item.isRead ? 'bg-blue-50/40 ring-1 ring-blue-100 dark:bg-blue-950/40 dark:ring-blue-900' : 'bg-card'
                                            }`}>
                                            <CardContent className="">
                                                <div className="flex gap-4">
                                                    <div className="relative">
                                                        <div className={`p-2 rounded-full ${!item.isRead ? 'bg-aqua/10 text-aqua dark:bg-aqua/20 dark:text-aqua' : 'bg-muted text-muted-foreground dark:bg-muted dark:text-muted-foreground'}`}>
                                                            <Clock className="w-5 h-5" />
                                                        </div>
                                                    </div>

                                                    <div className="flex-1 space-y-1">
                                                        <div className="flex justify-between items-start">
                                                            <h3 className={`text-sm tracking-tight ${!item.isRead ? 'font-semibold text-foreground' : 'font-medium text-foreground'}`}>
                                                                {item.title}
                                                            </h3>
                                                            <span className="text-[10px] text-muted-foreground font-medium whitespace-nowrap ml-2 uppercase">
                                                                {timeAgo(item?.createdAt?.toString() || "")}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                                            {item.message}
                                                        </p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))
                            ) : (
                                // Empty State
                                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                                    <div className="bg-muted p-4 rounded-full">
                                        <BellOff className="w-8 h-8 text-muted-foreground" />
                                    </div>
                                    <div className="space-y-1">
                                        <h2 className="text-lg font-semibold text-foreground">All caught up!</h2>
                                        <p className="text-sm text-muted-foreground max-w-[200px]">
                                            You don&apos;t have any notifications right now.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
            }
        </div>
    )
}

export default Notification
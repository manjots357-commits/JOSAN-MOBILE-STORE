import React, { useState, useEffect } from 'react';
import { CheckCircle2, Gift, Sparkles, X, EyeOff } from 'lucide-react';

interface ToastItem {
  id: string;
  title: string;
  desc: string;
  timeAgo: string;
  icon: 'phone' | 'gift' | 'check';
}

const TOASTS: ToastItem[] = [
  {
    id: 't-1',
    title: 'Just Delivered: iPhone 17 Pro 512GB',
    desc: 'Unboxed on counter with 1-Year Apple Warranty',
    timeAgo: '4m ago',
    icon: 'check'
  },
  {
    id: 't-2',
    title: 'Exchange Completed: Galaxy Z Fold 7',
    desc: 'Old Android traded in & credited instantly',
    timeAgo: '18m ago',
    icon: 'phone'
  },
  {
    id: 't-3',
    title: 'In-Store Setup: iPhone 16 Pro',
    desc: 'Data transferred & tempered glass installed',
    timeAgo: '32m ago',
    icon: 'gift'
  },
  {
    id: 't-4',
    title: 'Trade-In Completed: Galaxy S24 Ultra',
    desc: 'Old phone evaluated & credited to bill',
    timeAgo: '1h ago',
    icon: 'check'
  }
];

export const LiveDeliveryToasts: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % TOASTS.length);
        setVisible(true);
      }, 400);
    }, 7000);

    return () => clearInterval(interval);
  }, [isDismissed]);

  if (isDismissed) return null;

  const currentToast = TOASTS[currentIdx];

  return (
    <div className="fixed bottom-16 right-4 z-40 max-w-xs sm:max-w-sm hidden sm:block select-none animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div
        className={`p-3.5 rounded-xl bg-[#072D33]/95 border border-[rgba(155,188,171,0.25)] shadow-2xl backdrop-blur-md flex flex-col gap-2 transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[rgba(7,45,51,0.85)] border border-[#DFBE8B]/35 flex items-center justify-center text-[#DFBE8B] shrink-0">
              {currentToast.icon === 'gift' ? (
                <Gift className="w-3.5 h-3.5" />
              ) : currentToast.icon === 'phone' ? (
                <Sparkles className="w-3.5 h-3.5" />
              ) : (
                <CheckCircle2 className="w-3.5 h-3.5" />
              )}
            </div>
            <div>
              <div className="text-xs font-bold text-[#F5F2EA] line-clamp-1">
                {currentToast.title}
              </div>
              <div className="text-[11px] text-[#C8D8D0] line-clamp-1">
                {currentToast.desc}
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsDismissed(true)}
            className="text-[#9ABCAB] hover:text-[#F5F2EA] p-0.5"
            title="Dismiss toast"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-[#9ABCAB] pt-1 border-t border-[rgba(155,188,171,0.2)]">
          <span className="text-[#DFBE8B] font-semibold">&bull; Verified In-Store Delivery</span>
          <button
            onClick={() => setIsDismissed(true)}
            className="hover:text-[#DFBE8B] underline flex items-center gap-1"
          >
            <EyeOff className="w-2.5 h-2.5" />
            <span>Hide all</span>
          </button>
        </div>
      </div>
    </div>
  );
};

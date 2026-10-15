import React, { useState } from 'react';
import { X, Send, Phone, MessageCircle, CheckCircle2, Smartphone, Sparkles } from 'lucide-react';
import { storeInfo } from '../../data/media';

interface QuickRequestDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickRequestDrawer: React.FC<QuickRequestDrawerProps> = ({
  isOpen,
  onClose
}) => {
  const [serviceType, setServiceType] = useState('New Flagship Purchase');
  const [brand, setBrand] = useState('Apple iPhone');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi Josan Computer & Mobile!\n\nName: ${name || 'Customer'}\nContact: ${mobile || 'N/A'}\nRequirement: ${serviceType}\nPreferred Brand: ${brand}\nNotes: ${notes || 'Looking for best Punjab store deal & stock availability'}`;
    const url = `https://wa.me/919417765441?text=${encodeURIComponent(text)}`;
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#072D33]/85 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-[#072D33] border border-[rgba(155,188,171,0.25)] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[rgba(155,188,171,0.2)] pb-4">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono font-bold text-[#DFBE8B] uppercase tracking-wider">
              A CONSIDERED START &bull; CONCIERGE DESK
            </span>
            <h3 className="text-xl font-bold text-[#F5F2EA]">
              Request Device or Service
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#9ABCAB] hover:text-[#F5F2EA] hover:bg-[#3A7564]/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Requirement Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#C8D8D0]">
              What are you looking for?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                'New Flagship Purchase',
                'Screen & Hardware Repair',
                'In-Store Setup & Transfer',
                'Old Phone Trade-In'
              ].map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setServiceType(s)}
                  className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-all border ${
                    serviceType === s
                      ? 'bg-[#DFBE8B] text-[#33091B] border-[#DFBE8B] shadow-sm'
                      : 'bg-[#072D33]/90 text-[#C8D8D0] border-[rgba(155,188,171,0.2)] hover:text-[#F5F2EA]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Brand of Choice */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#C8D8D0]">
              Preferred Brand
            </label>
            <div className="flex flex-wrap gap-2">
              {['Apple iPhone', 'Samsung Galaxy', 'Vivo', 'Motorola', 'Other'].map((b) => (
                <button
                  type="button"
                  key={b}
                  onClick={() => setBrand(b)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                    brand === b
                      ? 'bg-[rgba(7,45,51,0.9)] text-[#DFBE8B] border-[#DFBE8B]'
                      : 'bg-[#072D33]/90 text-[#C8D8D0] border-[rgba(155,188,171,0.18)] hover:text-[#F5F2EA]'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Name & Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#C8D8D0]">
                Your Name
              </label>
              <input
                type="text"
                placeholder="e.g. Manjot Singh"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[rgba(7,45,51,0.85)] border border-[rgba(155,188,171,0.22)] text-xs text-[#F5F2EA] focus:border-[#DFBE8B] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#C8D8D0]">
                Mobile Number
              </label>
              <input
                type="tel"
                placeholder="e.g. 9876543210"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[rgba(7,45,51,0.85)] border border-[rgba(155,188,171,0.22)] text-xs text-[#F5F2EA] focus:border-[#DFBE8B] focus:outline-none"
              />
            </div>
          </div>

          {/* Optional Notes */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#C8D8D0]">
              Specific Model or Query (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. iPhone 16 Pro Max 512GB Desert Titanium or Galaxy Z Fold 6 stock"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[rgba(7,45,51,0.85)] border border-[rgba(155,188,171,0.22)] text-xs text-[#F5F2EA] focus:border-[#DFBE8B] focus:outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="pt-3 flex items-center gap-3">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#DFBE8B] hover:bg-[#ebd5b2] text-[#33091B] text-xs font-bold transition-all shadow-lg shadow-[#DFBE8B]/20"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Connect on WhatsApp</span>
            </button>

            <a
              href={`tel:${storeInfo.rawPhone}`}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[rgba(7,45,51,0.85)] hover:bg-[rgba(7,45,51,1)] text-[#F5F2EA] text-xs font-bold transition-all border border-[rgba(155,188,171,0.25)]"
            >
              <Phone className="w-4 h-4 text-[#DFBE8B]" />
              <span>Call Direct</span>
            </a>
          </div>
        </form>

        <div className="text-[11px] text-[#C8D8D0] text-center pt-1 border-t border-[rgba(155,188,171,0.15)]">
          Store Hours: Mon–Sun 10:00 AM – 9:00 PM &bull; Main Market, Punjab
        </div>
      </div>
    </div>
  );
};

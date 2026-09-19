import React from "react";

interface SectionCardProps {
  number: number;
  title: string;
  children: React.ReactNode;
}

const SectionCard = ({ number, title, children }: SectionCardProps) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100/60 p-8 sm:p-10 mb-8 overflow-hidden">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-10 h-10 rounded-full bg-flex-primary/5 flex items-center justify-center text-flex-primary font-bold text-lg border border-flex-primary/10">
          {number}
        </div>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h2>
      </div>
      <div className="space-y-8">
        {children}
      </div>
    </div>
  );
};

export default SectionCard;

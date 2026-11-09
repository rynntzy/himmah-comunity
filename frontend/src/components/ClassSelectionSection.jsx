import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import ClassCardVisual from './ClassCardVisual';

export default function ClassSelectionSection({ classes = [], selectedClasses = [], onSelectClass }) {
  const getCardStyle = (type, index) => {
    if (type === 'web' || index % 3 === 0) {
      return {
        bg: 'bg-gradient-to-b from-[#EEF6FF] to-[#F8FAFC]',
        border: 'border-blue-100 hover:border-blue-300',
        selectedBorder: 'ring-2 ring-blue-500 border-blue-400'
      };
    }
    if (type === 'robotics' || index % 3 === 1) {
      return {
        bg: 'bg-gradient-to-b from-[#EEFBF3] to-[#F8FCF9]',
        border: 'border-emerald-100 hover:border-emerald-300',
        selectedBorder: 'ring-2 ring-emerald-500 border-emerald-400'
      };
    }
    return {
      bg: 'bg-gradient-to-b from-[#FFF4EE] to-[#FFF9F6]',
      border: 'border-orange-100 hover:border-orange-300',
      selectedBorder: 'ring-2 ring-orange-500 border-orange-400'
    };
  };

  return (
    <section id="kelas-section" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header dengan Garis Aksen */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="h-[2px] w-8 sm:w-16 bg-emerald-600 rounded-full"></span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Pilih Komunitas Yang Anda Minati
            </h2>
            <span className="h-[2px] w-8 sm:w-16 bg-emerald-600 rounded-full"></span>
          </div>
          <p className="text-sm sm:text-base text-slate-600">
            Tingkatkan kemampuanmu bersama Himmah NWDI Kom. Teknik
          </p>
        </div>

        {/* Desktop Grid Layout */}
        <div className={`hidden md:grid gap-6 lg:gap-8 ${
          classes.length <= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'
        }`}>
          {classes.map((item, idx) => {
            const isSelected = selectedClasses.includes(item.name);
            const style = getCardStyle(item.type, idx);

            return (
              <div
                key={item.id || item.name}
                onClick={() => onSelectClass(item.name)}
                className={`group relative rounded-3xl p-6 sm:p-7 transition-all duration-300 flex flex-col items-center text-center cursor-pointer border shadow-xs hover:shadow-md hover:-translate-y-1 ${
                  style.bg
                } ${isSelected ? style.selectedBorder : style.border}`}
              >
                {/* Visual: Image Uploaded or 3D Visual */}
                <div className="mb-4 transform transition-transform group-hover:scale-105">
                  {item.image ? (
                    <div className="w-28 h-24 rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <ClassCardVisual type={item.type || 'web'} />
                  )}
                </div>

                {/* Nama Kelas */}
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {item.name}
                </h3>

                {/* Deskripsi */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 flex-grow">
                  {item.shortDesc}
                </p>

                {/* Tombol Pilih Kelas */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectClass(item.name);
                  }}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                    isSelected
                      ? 'bg-brand-primary text-white shadow-sm ring-2 ring-emerald-200'
                      : 'bg-white text-brand-800 border border-emerald-200 hover:border-brand-primary hover:bg-emerald-50'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <span>Terpilih</span>
                      <Check className="w-4 h-4 text-emerald-300" />
                    </>
                  ) : (
                    <>
                      <span>Pilih Kelas</span>
                      <ArrowRight className="w-3.5 h-3.5 text-brand-primary group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Mobile View: Vertical Compact List */}
        <div className="md:hidden flex flex-col gap-3.5">
          {classes.map((item, idx) => {
            const isSelected = selectedClasses.includes(item.name);
            return (
              <div
                key={item.id || item.name}
                onClick={() => onSelectClass(item.name)}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 shadow-xs active:scale-[0.99] ${
                  isSelected ? 'bg-emerald-50/80 border-brand-primary ring-1 ring-brand-primary' : 'bg-white border-slate-100 hover:border-emerald-200'
                }`}
              >
                {/* Visual Icon Mini */}
                <div className="w-14 h-14 shrink-0 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-100 overflow-hidden">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="scale-75">
                      <ClassCardVisual type={item.type || 'web'} />
                    </div>
                  )}
                </div>

                {/* Text Info */}
                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <h3 className="text-sm font-bold text-slate-900 truncate">
                      {item.name}
                    </h3>
                    {isSelected && (
                      <span className="px-1.5 py-0.2 text-[10px] bg-brand-primary text-white rounded-full font-bold">✓</span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">
                    {item.shortDesc}
                  </p>
                </div>

                <div className="shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-brand-primary text-white' : 'bg-emerald-50 text-brand-primary border border-emerald-200'
                  }`}>
                    {isSelected ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

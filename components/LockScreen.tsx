import React from 'react';
import { Lock, ArrowRight, AlertCircle } from 'lucide-react';

interface LockScreenProps {
    inputCode: string;
    setInputCode: (value: string) => void;
    errorMsg: string;
    onLogin: (e?: React.FormEvent) => void;
}

const LockScreen: React.FC<LockScreenProps> = ({
    inputCode,
    setInputCode,
    errorMsg,
    onLogin
}) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 border border-slate-100 animate-fade-in text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                    <Lock size={32} strokeWidth={1.5} />
                </div>

                <h2 className="text-xl font-semibold text-slate-800 mb-2">
                    需要權限
                </h2>
                <p className="text-sm text-slate-500 mb-8">
                    此工具僅供內部使用，請輸入通行碼。
                </p>

                <form onSubmit={onLogin} className="relative">
                    <input
                        type="password"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        placeholder="請輸入通行碼"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-center text-lg tracking-widest outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all mb-4"
                        autoFocus
                    />

                    <button
                        type="submit"
                        disabled={!inputCode}
                        className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                        進入系統 <ArrowRight size={16} />
                    </button>
                </form>

                {errorMsg && (
                    <div className="mt-4 flex items-center justify-center gap-2 text-red-500 text-sm animate-bounce">
                        <AlertCircle size={14} />
                        {errorMsg}
                    </div>
                )}

                <div className="mt-8 pt-6 border-t border-slate-100">
                    <p className="text-slate-300 text-[10px] tracking-[0.2em] uppercase font-medium">
                        MADE BY LUKASCHIU
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LockScreen;

import Image from "next/image";
import Link from "next/link";

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="flex items-center justify-between px-6 h-[60px] border-b border-slate-100 shrink-0 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg shrink-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Yesp" className="w-7 h-7 object-contain" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-slate-900 leading-tight group-hover:text-blue-700 transition-colors">
              Yesp Accounts
            </p>
            <p className="text-[10px] text-slate-400 leading-tight">Security</p>
          </div>
        </Link>

        <nav className="hidden sm:flex items-center gap-1">
          <a
            href="https://yespstudio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors"
          >
            About Yesp
          </a>
          <Link
            href="/help"
            className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors"
          >
            Help
          </Link>
          <Link
            href="/auth/login"
            className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
          >
            Sign in
          </Link>
        </nav>

        <Link
          href="/auth/login"
          className="sm:hidden text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          Sign in
        </Link>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-slate-100 py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-400">&copy; {new Date().getFullYear()} Yesp Corporation · All rights reserved</span>
          <div className="flex items-center gap-5">
            <a href="https://yespstudio.com/privacy" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Privacy</a>
            <Link href="/security" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Security</Link>
            <Link href="/help" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Help</Link>
            <a href="https://yespstudio.com/contact" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

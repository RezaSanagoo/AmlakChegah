// import { useRouter } from "next/router";

export default function Custom404() {
  // const router = useRouter(); 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-primary/10 to-secendery/20 p-8">
      <div className="text-center rounded-3xl shadow-2xl border border-primary/20 bg-white/60 backdrop-blur-md p-10 max-w-lg w-full">
        <h1 className="text-9xl font-extrabold text-primary drop-shadow-lg">404</h1>
        <p className="mt-4 text-2xl font-semibold text-secendery">
          صفحه مورد نظر پیدا نشد 😔
        </p>
        <p className="mt-2 text-gray-600">
          ممکنه لینک اشتباه باشه یا صفحه حذف شده باشه.
        </p>

        <div className="mt-8 flex justify-center">
          <button
            // onClick={() => router.back()} 
            className="flex items-center gap-2 px-6 py-3 rounded-2xl font-medium text-white bg-primary hover:bg-secendery transition-all shadow-lg"
          >
            <span className="text-xl">🏠</span>
            <span>برگشت به عقب</span>
          </button>
        </div>
      </div>
    </div>
  );
}

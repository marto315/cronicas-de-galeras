import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="font-display text-7xl text-clay">404</p>
      <h1 className="mt-4 font-display text-3xl text-umber">
        Esta página no está en las crónicas
      </h1>
      <p className="mt-3 max-w-md text-ink/80">
        Puede que el enlace esté roto o que la historia aún no se haya contado.
        Volvamos al parque.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-clay px-7 py-3 font-semibold text-cream transition hover:bg-clay-dark"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
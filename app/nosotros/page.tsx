import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Quiénes estamos detrás de Crónicas de Galeras, la misión del proyecto y cómo puedes participar contando la memoria del municipio.",
};

export default function NosotrosPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl text-umber sm:text-5xl">El proyecto</h1>

      <div className="prose-cronicas mt-8">
        <p>
          <strong>Crónicas de Galeras</strong> nació con una idea sencilla y poderosa: que la historia, los
          mitos, las leyendas, los personajes, la fe y el folclor del municipio de Galeras, Sucre (Colombia),
          queden escritos para siempre y lleguen a mucha gente.
        </p>
        <p>
          Cada pueblo tiene una memoria que se transmite de voz en voz: en las noches de patio, alrededor del
          fogón, en la esquina del parque o a la salida de misa. Esas historias son un patrimonio valioso que,
          si no se registran, pueden perderse con el tiempo.
        </p>
        <h2>Nuestra misión</h2>
        <ul>
          <li>Recoger y publicar la <strong>historia</strong> del municipio, con respeto por las fuentes.</li>
          <li>Preservar <strong>mitos, leyendas y relatos</strong> de la tradición oral.</li>
          <li>Reconocer a los <strong>personajes</strong> que aportaron al crecimiento del pueblo.</li>
          <li>Celebrar la <strong>religión, la cultura y el folclor</strong> que nos dan identidad.</li>
          <li>Convertir la web en un <strong>archivo cultural</strong> accesible para todos.</li>
        </ul>
        <h2>¿Cómo participar?</h2>
        <p>
          Si eres de Galeras, de Sucre o de la región, tu memoria también es parte de estas crónicas. Puedes
          contarnos anécdotas, aportar datos históricos, compartir fotografías antiguas o escribir una
          crónica. Nos encantaría recibir tu aporte y darle la visibilidad que merece.
        </p>
        <p>
          Escríbenos por{" "}
          {siteConfig.social.instagram ? (
            <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          ) : (
            "nuestras redes sociales"
          )}{" "}
          y hagamos crecer juntos la memoria de nuestro pueblo.
        </p>
      </div>

      <div className="mt-10">
        <Link
          href="/blog"
          className="inline-block rounded-full bg-clay px-7 py-3 font-semibold text-cream transition hover:bg-clay-dark"
        >
          Leer las crónicas
        </Link>
      </div>
    </div>
  );
}

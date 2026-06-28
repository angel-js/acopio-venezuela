import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { DesaparecidosSection } from "@/components/DesaparecidosSection";
import { DonacionesSection } from "@/components/DonacionesSection";
import { AyudaSection } from "@/components/AyudaSection";
import { AcopioSection } from "@/components/AcopioSection";
import { ContactSection } from "@/components/ContactSection";

import { Footer } from "@/components/Footer";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale: locale === "es" ? "es_VE" : "en_US",
    },
  };
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <DesaparecidosSection />
        <DonacionesSection />
        <AyudaSection categoria="ninos" />
        <AyudaSection categoria="comida" />
        <AyudaSection categoria="salud" />
        <AyudaSection categoria="registro" />
        <AyudaSection categoria="ingenieria" />
        <AyudaSection categoria="animales" />
        <AcopioSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

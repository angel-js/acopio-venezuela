import { EmergencyBar } from "@/components/EmergencyBar";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ImpactStats } from "@/components/ImpactStats";
import { ActionCards } from "@/components/ActionCards";
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ayudavenezuela2026.org";

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: { es: `${siteUrl}/es`, en: `${siteUrl}/en` },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${siteUrl}/${locale}`,
      siteName: "Ayuda Venezuela",
      type: "website",
      locale: locale === "es" ? "es_VE" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default function Home() {
  return (
    <>
      <EmergencyBar />
      <Navbar />
      <main>
        <ImpactStats />
        <Hero />
        <ActionCards />
        <DesaparecidosSection />
        <DonacionesSection />
        <AyudaSection />
        <AcopioSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("hero");

  return (
    <main className="min-h-screen">
      <h1 className="text-4xl font-display text-venezuela-blue p-8">
        {t("title")}
      </h1>
      <p className="text-lg px-8">{t("subtitle")}</p>
    </main>
  );
}

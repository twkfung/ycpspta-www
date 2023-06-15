import Image from "next/image"
import styles from "./page.module.css"
import vercelSvg from "@/public/vercel.svg"
import nextSvg from "@/public/next.svg"

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src={vercelSvg}
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src={nextSvg}
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <div>
          <p>
            現今的社會發展步伐急速，科技發展也必須與時並進。科創的重要性亦毋庸置疑。
          </p>
          <p>
            科創領域無窮無盡。記得當年求學時，老師曾經跟我們討論「創造」的定義。他說一切發明及創造源於一個字
            ─「無」。「無」是「無中生有」。當時年紀還少，未能充分了解老師的解說。及後才明白「無」是「無限、無窮無盡」。一切的創造均源於「無」，因為某種事物尚未存在，在創造後，它才存在。這便是「無中生有」的意思。譬如說從前沒有電腦，但在研發後，它便存在了。不過，這並不表示科創可以停止。反之，科創會延續下去。因此，「無」永遠比「有」大。
          </p>
          <p>
            本學年學校致力提升同學認識「科創」的重要性，正是啟發他們的創作力、訓練及挑戰他們的高階思維，以及培養獨立思考能力的大好時機。同時，也可以為他們準備好與未來社會接軌。願我們學校的學生能把握珍貴的學習機會，珍惜學校的培育，成長後造福社會。
          </p>
        </div>
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore the Next.js 13 playground.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  )
}

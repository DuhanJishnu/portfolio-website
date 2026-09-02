import Image from "next/image"

const disciplines = ["Generative AI", "RAG systems", "React / Next.js", "Three.js / WebGL", "Python", "LangChain"]

export default function About() {
  return (
    <section id="about" className="about-section" aria-labelledby="about-heading">
      <div className="about-portrait">
        <div className="portrait-frame">
          <Image src="/profile_img_new.png" alt="Jishnu Duhan" width={1024} height={1024} sizes="(max-width: 800px) 90vw, 36vw" />
        </div>
        <div className="portrait-orbit" aria-hidden="true">AI&nbsp;&nbsp;•&nbsp;&nbsp;CODE&nbsp;&nbsp;•&nbsp;&nbsp;IMAGINATION&nbsp;&nbsp;•</div>
      </div>

      <div className="about-copy">
        <div className="section-mini"><span>03</span> Human behind the machine</div>
        <h2 id="about-heading">Curious by nature.<br /><em>Precise by design.</em></h2>
        <p className="about-lead">I&apos;m Jishnu Duhan, a computer science student and creative developer obsessed with making intelligent technology feel clear, tactile, and human.</p>
        <p>From training small language models to shipping production interfaces, I move fluidly between deep technical problems and the details people actually touch.</p>
        <div className="discipline-grid">
          {disciplines.map((item, index) => <div key={item}><span>0{index + 1}</span>{item}</div>)}
        </div>
      </div>

      <div className="timeline">
        <div className="timeline-title">Selected timeline</div>
        <article><time>Jul-Sep 2026</time><div><h3>Project Intern</h3><p>Oracle India Pvt. Ltd.</p></div></article>
        <article><time>2025 — Now</time><div><h3>Web Development Co-Coordinator</h3><p>Shishir, NIT Meghalaya</p></div></article>
        <article><time>Feb-Apr 2025</time><div><h3>Software Developement Engineer Intern</h3><p>ONLYBEES · AFC ticketing platform</p></div></article>
        <article><time>Jul 2023 — Now</time><div><h3>B.Tech, Computer Science</h3><p>National Institute of Technology, Meghalaya · CGPA 9.96</p></div></article>
      </div>
    </section>
  )
}

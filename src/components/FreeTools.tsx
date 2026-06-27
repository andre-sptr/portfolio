import { motion } from 'framer-motion';
import { FileText, ArrowUpRight, CloudUpload, Languages, Swords } from 'lucide-react';

const tools = [
  {
    name: "PDF Tools",
    description: "Comprehensive suite for merging, splitting, and converting PDF documents.",
    url: "https://pdf.andresptr.site",
    icon: FileText,
    accent: "from-primary/10 to-primary/5",
    isImage: false,
  },
  {
    name: "File Hosting",
    description: "Secure and reliable file hosting solution for all your storage needs.",
    url: "https://file.andresptr.site",
    icon: CloudUpload,
    accent: "from-secondary/10 to-secondary/5",
    isImage: false,
  },
  {
    name: "EnglishHub",
    description: "AI-powered TOEFL practice platform to sharpen your English skills.",
    url: "https://englishhub.andresptr.site",
    icon: Languages,
    accent: "from-emerald-500/10 to-emerald-500/5",
    isImage: false,
  },
  {
    name: "Arena AI Debate",
    description: "Engage in AI-powered debates and sharpen your argumentation skills.",
    url: "https://debat.andresptr.site",
    icon: Swords,
    accent: "from-amber-500/10 to-amber-500/5",
    isImage: false,
  },
];

const FreeTools = () => {
  return (
    <section id="tools" className="py-16 md:py-24 relative overflow-hidden" style={{ background: "var(--surface-0)" }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Free <span className="text-gradient">Tools</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of free, powerful tools designed to boost your productivity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {tools.map((tool, index) => {
            const isLarge = index < 2;
            const ToolIcon = tool.icon;
            return (
              <motion.a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group glass-card rounded-2xl hover:border-primary/40 transition-all duration-300 relative overflow-hidden ${isLarge ? "lg:col-span-2 p-6 sm:p-8" : "p-5 sm:p-6"}`}
                whileHover={{ y: -4 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className={`${isLarge ? "w-16 h-16" : "w-14 h-14"} rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-5 transition-all duration-300 group-hover:shadow-[var(--glow-primary)] group-hover:scale-105`}>
                    <ToolIcon className={`${isLarge ? "w-8 h-8" : "w-7 h-7"} text-primary`} />
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className={`${isLarge ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"} font-bold mb-2 group-hover:text-primary transition-colors`}>
                        {tool.name}
                      </h3>
                      <p className={`${isLarge ? "text-sm" : "text-xs sm:text-sm"} text-muted-foreground leading-relaxed`}>
                        {tool.description}
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 mt-1">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FreeTools;

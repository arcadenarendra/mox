import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  Eye,
  ShieldCheck,
  BrainCircuit,
  TrendingUp,
  Lock,
  Wifi,
  Leaf,
  Zap,
  Landmark,
  BarChart2,
  Database,
  Briefcase,
  Clapperboard,
} from 'lucide-react';

const PROGRAMMES = [
  {
    id: 'vicai',
    code: 'ViCAI',
    title: 'Visual and Creative Artificial Intelligence',
    subtitle: 'Visual and Creative Artificial Intelligence',
    tags: ['Artificial Intelligence'],
    url: 'https://programmes.polytechnique.edu/en/master/all-msct-programs/artificial-intelligence-advanced-visual-computing-master',
    icon: Eye,
  },
  {
    id: 'trai',
    code: 'TRAI',
    title: 'Trustworthy and Responsible AI',
    subtitle: 'Trustworthy and Responsible AI',
    tags: ['Artificial Intelligence'],
    url: 'https://programmes.polytechnique.edu/en/master/all-msct-specializations/trustworthy-and-responsible-ai-trai',
    icon: ShieldCheck,
  },
  {
    id: 'llga',
    code: 'LLGA',
    title: 'Large Language Models, Graphs & Applications',
    subtitle: 'Large Language Models, Graphs & Applications',
    tags: ['AI', 'Computer Science'],
    url: 'https://programmes.polytechnique.edu/en/master/all-msct-specializations/large-language-models-graphs-and-applications-llga',
    icon: BrainCircuit,
  },
  {
    id: 'maqi',
    code: 'MaQI',
    title: 'AI for Markets and Quantitative Investment (X–ENSAE)',
    subtitle: 'AI for Markets and Quantitative Investment (X–ENSAE)',
    tags: ['AI', 'Finance'],
    url: 'https://programmes.polytechnique.edu/en/master/all-msct-specializations/ai-for-markets-and-quantitative-investment-x-ensae-maqi',
    icon: TrendingUp,
  },
  {
    id: 'cys',
    code: 'CyS',
    title: 'Cybersecurity',
    subtitle: 'Cybersecurity',
    tags: ['Computer Science'],
    url: 'https://programmes.polytechnique.edu/en/master/all-msct-specializations/cybersecurity-cys',
    icon: Lock,
  },
  {
    id: 'iot',
    code: 'IoT',
    title: 'Internet of Things: Innovation and Management',
    subtitle: 'Internet of Things: Innovation and Management',
    tags: ['Technology'],
    url: 'https://programmes.polytechnique.edu/en/master/all-msct-programs/internet-of-things-innovation-and-management',
    icon: Wifi,
  },
  {
    id: 'eesm',
    code: 'EESM',
    title: 'Environmental Engineering and Sustainability Management',
    subtitle: 'Environmental Engineering and Sustainability Management',
    tags: ['Environment'],
    url: 'https://programmes.polytechnique.edu/en/master-all-msct-programs/environmental-engineering-and-sustainability-management',
    icon: Leaf,
  },
  {
    id: 'steem',
    code: 'STEEM',
    title: 'Energy Environment: Science Technology and Management',
    subtitle: 'Energy Environment: Science Technology and Management',
    tags: ['Energy', 'Environment'],
    url: 'https://programmes.polytechnique.edu/en/master-all-msct-programs/energy-environment-science-technology-and-management',
    icon: Zap,
  },
  {
    id: 'depp',
    code: 'DEPP',
    title: 'Data and Economics for Public Policy (X–ENSAE–Telecom)',
    subtitle: 'Data and Economics for Public Policy (X–ENSAE–Telecom)',
    tags: ['Data Science', 'Economy'],
    url: 'https://programmes.polytechnique.edu/en/master/all-msct-specializations/data-and-economics-for-public-policy-x-ensae-telecom-depp',
    icon: Landmark,
  },
  {
    id: 'edacf',
    code: 'EDACF',
    title: 'Economics, Data Analytics and Corporate Finance (X–Bocconi)',
    subtitle: 'Economics, Data Analytics and Corporate Finance (X–Bocconi)',
    tags: ['Economy', 'Finance'],
    url: 'https://programmes.polytechnique.edu/en/master-all-msct-programs/economics-data-analytics-and-corporate-finance/economics-data-analytics',
    icon: BarChart2,
  },
  {
    id: 'dddf',
    code: 'DDDF',
    title: 'Double Degree Data & Finance (X–HEC)',
    subtitle: 'Double Degree Data & Finance (X–HEC)',
    tags: ['Data Science', 'Finance'],
    url: 'https://programmes.polytechnique.edu/en/master/all-msct-specializations/double-degree-data-finance-x-hec-dddf',
    icon: Database,
  },
  {
    id: 'dsaib',
    code: 'DSAIB',
    title: 'Data Science and AI for Business (X–HEC)',
    subtitle: 'Data Science and AI for Business (X–HEC)',
    tags: ['Data Science', 'AI'],
    url: 'https://programmes.polytechnique.edu/en/master/programs/data-science-for-business-joint-degree-with-hec',
    icon: Briefcase,
  },
  {
    id: 'excin',
    code: 'EXcin',
    title: 'Science & Technology in Extended Cinematography (X–ENS Louis Lumière)',
    subtitle: 'Science & Technology in Extended Cinematography (X–ENS Louis Lumière)',
    tags: ['Technology', 'Arts'],
    url: 'https://programmes.polytechnique.edu/en/master/all-msct-specializations/science-technology-in-extended-cinematography-excin',
    icon: Clapperboard,
  },
];

export default function Programmes() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-[#0a203c] to-[#1a5a7f] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Our 13 Masters Programmes</h1>
          <p className="max-w-3xl text-white/90">
            Globally recruited, taught exclusively in English, spanning AI, data science, cybersecurity, energy transition,
            economics, and the arts. The most specialised postgraduate cohort in France.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROGRAMMES.map((p) => {
              const Icon = p.icon;
              return (
                <Card key={p.id} className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="bg-gradient-to-br from-[#0a203c] to-[#1a5a7f] flex items-center justify-center h-32">
                    <Icon className="text-white/80" size={48} strokeWidth={1.5} />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg text-[#0a203c] font-semibold">{p.code}</CardTitle>
                    <CardDescription className="text-sm text-gray-600">{p.title}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 line-clamp-3">{p.subtitle}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <Badge key={t} variant="outline" className="text-xs uppercase">
                          {t}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-4">
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-sm text-[#0a203c] underline">
                        Learn more →
                      </a>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

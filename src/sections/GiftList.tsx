import { useState, useEffect } from 'react';
import { Gift, Heart, Coffee, Wine, BookOpen, Sun, Utensils, Home, Star, Plane, Music, Sparkles, Gamepad2, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface GiftItem {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  value: number;
}

export function GiftList() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);
  const [copied, setCopied] = useState(false);

  const pixKey = 'adailton.medeiros@gmail.com';
  const accountName = 'Adailton Medeiros Rodrigues de Oliveira';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('presentes');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(pixKey);
      setCopied(true);
      toast.success('Chave PIX copiada!');
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = pixKey;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      toast.success('Chave PIX copiada!');
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const gifts: GiftItem[] = [
    {
      id: 1,
      icon: <Wine className="w-8 h-8" />,
      title: 'Uma noite de romance',
      description: 'Jantar à luz de velas para brindar mais 25 anos juntos',
      value: 150,
    },
    {
      id: 2,
      icon: <Coffee className="w-8 h-8" />,
      title: 'Café da manhã na cama',
      description: 'Um momento especial e aconchegante para começar o dia',
      value: 80,
    },
    {
      id: 3,
      icon: <Sun className="w-8 h-8" />,
      title: 'Piquenique ao pôr do sol',
      description: 'Cesta com vinho, queijos e momentos inesquecíveis',
      value: 120,
    },
    {
      id: 4,
      icon: <Heart className="w-8 h-8" />,
      title: 'Dia de spa em casa',
      description: 'Produtos de bem-estar para relaxar juntos',
      value: 200,
    },
    {
      id: 5,
      icon: <Plane className="w-8 h-8" />,
      title: 'Aventura de um dia',
      description: 'Passeio inesquecível para criar novas memórias',
      value: 250,
    },
    {
      id: 6,
      icon: <Gift className="w-8 h-8" />,
      title: 'Cesta de chocolates finos',
      description: 'Para adoçar a vida e celebrar o amor',
      value: 100,
    },
    {
      id: 7,
      icon: <Wine className="w-8 h-8" />,
      title: 'Vinho especial',
      description: 'Uma garrafa selecionada para brindar',
      value: 180,
    },
    {
      id: 8,
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Livro de memórias',
      description: 'Álbum para guardar nossas fotos e histórias',
      value: 90,
    },
    {
      id: 9,
      icon: <Utensils className="w-8 h-8" />,
      title: 'Jantar romântico',
      description: 'Experiência gastronômica em restaurante especial',
      value: 300,
    },
    {
      id: 10,
      icon: <Home className="w-8 h-8" />,
      title: 'Fim de semana na praia',
      description: 'Escapada romântica para recarregar as energias',
      value: 500,
    },
    {
      id: 11,
      icon: <Coffee className="w-8 h-8" />,
      title: 'Café da manhã gourmet',
      description: 'Delícias matinais com produtos especiais',
      value: 130,
    },
    {
      id: 12,
      icon: <Star className="w-8 h-8" />,
      title: 'Curso de culinária juntos',
      description: 'Aprender e se divertir na cozinha',
      value: 350,
    },
    {
      id: 13,
      icon: <Music className="w-8 h-8" />,
      title: 'Noite de karaokê em casa',
      description: 'Microfone, playlist especial e muita diversão a dois',
      value: 160,
    },
    {
      id: 14,
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Sessão de fotos divertida',
      description: 'Ensaio fotográfico para eternizar mais um ano de amor',
      value: 400,
    },
    {
      id: 15,
      icon: <Gamepad2 className="w-8 h-8" />,
      title: 'Noite de jogos a dois',
      description: 'Jogos de tabuleiro, pipoca e competição saudável',
      value: 110,
    },
  ];

  const scrollToPix = () => {
    const element = document.getElementById('pix-key-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="presentes" className="py-20 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="font-script text-5xl md:text-6xl text-dark-text mb-4">
            Lista de Presentes
          </h2>
          <p className="font-serif text-lg text-light-text italic max-w-2xl mx-auto">
            Sua presença é o melhor presente, mas se desejar nos presentear  
            transforme seu carinho em solidariedade: o valor dos presentes 
            da lista será doado a uma causa especial, enquanto nós realizaremos
             o desejo escolhido para celebrar nossa união.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
          {gifts.map((gift, index) => (
            <div
              key={gift.id}
              className={`bg-white p-6 shadow-elegant transition-all duration-700 hover:shadow-elegant-hover hover:-translate-y-1 cursor-pointer group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 50 + 200}ms` }}
              onClick={() => setSelectedGift(gift)}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-cream rounded-full flex items-center justify-center mb-4 text-olive transition-all duration-300 group-hover:bg-olive group-hover:text-white">
                  {gift.icon}
                </div>
                
                <h3 className="font-script text-2xl text-dark-text mb-2">
                  {gift.title}
                </h3>
                
                <p className="font-serif text-sm text-light-text mb-4 line-clamp-2">
                  {gift.description}
                </p>
                
                <div className="mt-auto pt-4 border-t border-gray-100 w-full">
                  <p className="font-script text-2xl text-champagne">
                    R$ {gift.value.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PIX Details Area */}
        <div id="pix-key-section" className={`max-w-4xl mx-auto bg-white p-8 md:p-12 shadow-elegant transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-olive rounded-full flex items-center justify-center mb-6 animate-pulse-soft">
              <Gift className="w-8 h-8 text-white" />
            </div>

            <h3 className="font-script text-3xl md:text-4xl text-dark-text mb-6">
              Presenteie com <span className="font-serif">PIX</span>
            </h3>
            
            <p className="font-serif text-lg text-light-text italic mb-8 max-w-lg">
              Escolha um item da lista e faça o PIX no valor correspondente. 
              Seu carinho será transformado em solidariedade!
            </p>

            <div className="bg-cream p-6 md:p-8 w-full max-w-lg mb-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between gap-4">
                <div className="text-left">
                  <p className="font-sans text-xs uppercase tracking-wider text-light-text mb-1">
                    Chave E-mail
                  </p>
                  <p className="font-serif text-lg md:text-xl text-dark-text break-all">
                    {pixKey}
                  </p>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="flex-shrink-0 w-12 h-12 bg-champagne hover:bg-[#B8A796] text-white flex items-center justify-center transition-all duration-300 hover:scale-105"
                  aria-label="Copiar chave PIX"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="mb-8">
              <p className="font-sans text-xs uppercase tracking-wider text-light-text mb-1">
                Nome
              </p>
              <p className="font-serif text-lg text-dark-text">
                {accountName}
              </p>
            </div>

            <div className="w-24 h-px bg-champagne" />
          </div>
        </div>

        {/* Selected Gift Modal */}
        {selectedGift && (
          <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedGift(null)}
          >
            <div 
              className="bg-white p-8 max-w-md w-full shadow-2xl animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mb-4 text-olive">
                  {selectedGift.icon}
                </div>
                
                <h3 className="font-script text-3xl text-dark-text mb-2">
                  {selectedGift.title}
                </h3>
                
                <p className="font-serif text-base text-light-text mb-4">
                  {selectedGift.description}
                </p>
                
                <p className="font-script text-3xl text-champagne mb-6">
                  R$ {selectedGift.value.toFixed(2)}
                </p>
                
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setSelectedGift(null);
                      scrollToPix();
                    }}
                    className="bg-champagne hover:bg-[#B8A796] text-white px-6 py-3 font-sans text-sm uppercase tracking-wider transition-all duration-300"
                  >
                    Presentear
                  </button>
                  <button
                    onClick={() => setSelectedGift(null)}
                    className="border border-gray-300 hover:border-champagne text-light-text hover:text-champagne px-6 py-3 font-sans text-sm uppercase tracking-wider transition-all duration-300"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

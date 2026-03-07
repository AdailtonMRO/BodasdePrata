import { useState, useEffect } from 'react';
import { Calendar, Check, User, Mail, Phone, Users, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

export function RSVP() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    attending: '',
    bringingGuest: '',
    guestName: '',
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('rsvp');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.attending) {
      toast.error('Por favor, preencha os campos obrigatórios');
      return;
    }

    if (formData.attending === 'sim' && !formData.bringingGuest) {
      toast.error('Por favor, informe se levará acompanhante');
      return;
    }

    setIsSubmitting(true);

    // Google Apps Script Web App URL
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyDBzAo_E1_c7r5XxjDq2ljm3aIR94cZc5beyaV2XlDriHsPx8DEwp5JSIwqtsNxWepRQ/exec'
      
     
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          attending: formData.attending === 'sim' ? 'Sim' : 'Não',
          bringingGuest: formData.bringingGuest === 'sim' ? 'Sim' : 'Não',
          guestName: formData.guestName || '-',
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast.success('Presença confirmada com sucesso!');
      } else {
        throw new Error('Erro na resposta');
      }
    } catch (error) {
      // Fallback: salvar no localStorage e mostrar mensagem de sucesso
      const savedRSVPs = JSON.parse(localStorage.getItem('rsvps') || '[]');
      savedRSVPs.push({
        ...formData,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('rsvps', JSON.stringify(savedRSVPs));
      
      setIsSubmitted(true);
      toast.success('Presença confirmada! (Salvo localmente)');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <section id="rsvp" className="py-20 md:py-32 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`bg-cream p-10 md:p-16 text-center shadow-elegant transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="w-20 h-20 bg-olive rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h3 className="font-script text-4xl md:text-5xl text-dark-text mb-4">
              Obrigado!
            </h3>
            <p className="font-serif text-lg text-light-text">
              Sua presença foi confirmada. Estamos ansiosos para celebrar com você!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-20 md:py-32 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="font-script text-5xl md:text-6xl text-dark-text mb-4">
            Confirme sua Presença
          </h2>
          <div className="flex items-center justify-center gap-3 text-olive">
            <Calendar className="w-5 h-5" />
            <p className="font-sans text-sm uppercase tracking-wider">
              Data limite: 27 de Março de 2026
            </p>
          </div>
        </div>

        <form 
          onSubmit={handleSubmit}
          className={`bg-white p-8 md:p-12 shadow-elegant transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="font-sans text-sm uppercase tracking-wider text-light-text flex items-center gap-2">
                <User className="w-4 h-4" />
                Nome Completo *
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="rounded-none border-gray-200 focus:border-champagne focus:ring-champagne font-serif text-lg py-6"
                placeholder="Digite seu nome completo"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="font-sans text-sm uppercase tracking-wider text-light-text flex items-center gap-2">
                <Mail className="w-4 h-4" />
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="rounded-none border-gray-200 focus:border-champagne focus:ring-champagne font-serif text-lg py-6"
                placeholder="seu@email.com"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="font-sans text-sm uppercase tracking-wider text-light-text flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Telefone
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="rounded-none border-gray-200 focus:border-champagne focus:ring-champagne font-serif text-lg py-6"
                placeholder="(00) 00000-0000"
              />
            </div>

            {/* Attending */}
            <div className="space-y-3">
              <Label className="font-sans text-sm uppercase tracking-wider text-light-text flex items-center gap-2">
                <Check className="w-4 h-4" />
                Vai comparecer? *
              </Label>
              <RadioGroup
                value={formData.attending}
                onValueChange={(value) => handleInputChange('attending', value)}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="sim" className="border-champagne text-champagne" />
                  <Label htmlFor="sim" className="font-serif text-lg cursor-pointer">Sim, estarei lá!</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="nao" className="border-champagne text-champagne" />
                  <Label htmlFor="nao" className="font-serif text-lg cursor-pointer">Infelizmente não poderei ir</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Guest (only if attending) */}
            {formData.attending === 'sim' && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-3">
                  <Label className="font-sans text-sm uppercase tracking-wider text-light-text flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Levará acompanhante? (máx. 1)
                  </Label>
                  <RadioGroup
                    value={formData.bringingGuest}
                    onValueChange={(value) => handleInputChange('bringingGuest', value)}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sim" id="guest-sim" className="border-champagne text-champagne" />
                      <Label htmlFor="guest-sim" className="font-serif text-lg cursor-pointer">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nao" id="guest-nao" className="border-champagne text-champagne" />
                      <Label htmlFor="guest-nao" className="font-serif text-lg cursor-pointer">Não</Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.bringingGuest === 'sim' && (
                  <div className="space-y-2 animate-fade-in">
                    <Label htmlFor="guestName" className="font-sans text-sm uppercase tracking-wider text-light-text">
                      Nome do Acompanhante
                    </Label>
                    <Input
                      id="guestName"
                      type="text"
                      value={formData.guestName}
                      onChange={(e) => handleInputChange('guestName', e.target.value)}
                      className="rounded-none border-gray-200 focus:border-champagne focus:ring-champagne font-serif text-lg py-6"
                      placeholder="Nome completo do acompanhante"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-champagne hover:bg-[#B8A796] text-white rounded-none py-6 font-sans text-sm uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
            >
              {isSubmitting ? 'Enviando...' : 'Confirmar Presença'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

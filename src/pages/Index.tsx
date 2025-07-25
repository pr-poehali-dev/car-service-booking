import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";

export default function Index() {
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    date: '',
    time: '',
    service: '',
    name: '',
    phone: '',
    description: ''
  });

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 5) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleServiceClick = (serviceValue: string) => {
    setAppointmentData({...appointmentData, service: serviceValue});
    setIsAppointmentOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Запись создана:', appointmentData);
    alert('Запись успешно создана! Мы свяжемся с вами для подтверждения.');
    setIsAppointmentOpen(false);
    setAppointmentData({
      date: '',
      time: '',
      service: '',
      name: '',
      phone: '',
      description: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Wrench" className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">ГРМ - Гаражная Ремонтная Мастерская</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Автомобили</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Клиенты</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Работы</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Запчасти</a>
            </nav>
            <Dialog open={isAppointmentOpen} onOpenChange={setIsAppointmentOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Записаться
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-center">Записаться на услугу</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Имя</Label>
                      <Input
                        id="name"
                        value={appointmentData.name}
                        onChange={(e) => setAppointmentData({...appointmentData, name: e.target.value})}
                        placeholder="Ваше имя"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Телефон</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={appointmentData.phone}
                        onChange={(e) => setAppointmentData({...appointmentData, phone: e.target.value})}
                        placeholder="+7 (XXX) XXX-XX-XX"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="service">Тип услуги</Label>
                    <Select value={appointmentData.service} onValueChange={(value) => setAppointmentData({...appointmentData, service: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите услугу" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="maintenance">Техобслуживание</SelectItem>
                        <SelectItem value="diagnostics">Диагностика</SelectItem>
                        <SelectItem value="engine">Ремонт двигателя</SelectItem>
                        <SelectItem value="transmission">Ремонт трансмиссии</SelectItem>
                        <SelectItem value="suspension">Ремонт ходовой</SelectItem>
                        <SelectItem value="tires">Шиномонтаж</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Дата</Label>
                      <Input
                        id="date"
                        type="date"
                        value={appointmentData.date}
                        onChange={(e) => setAppointmentData({...appointmentData, date: e.target.value})}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Время</Label>
                      <Select value={appointmentData.time} onValueChange={(value) => setAppointmentData({...appointmentData, time: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите время" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>{time}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Описание работ или комментарии</Label>
                    <Textarea
                      id="description"
                      value={appointmentData.description}
                      onChange={(e) => setAppointmentData({...appointmentData, description: e.target.value})}
                      placeholder="Опишите проблему или укажите необходимые работы..."
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button type="button" variant="outline" className="flex-1" onClick={() => setIsAppointmentOpen(false)}>
                      Отмена
                    </Button>
                    <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                      Записаться
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Профессиональный сервис для вашего автомобиля
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Качественный ремонт, техническое обслуживание и диагностика. 
              Опытные мастера, современное оборудование, гарантия результата.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Dialog open={isAppointmentOpen} onOpenChange={setIsAppointmentOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    <Icon name="Calendar" className="mr-2 h-5 w-5" />
                    Записаться онлайн
                  </Button>
                </DialogTrigger>
              </Dialog>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Icon name="Phone" className="mr-2 h-5 w-5" />
                Позвонить
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Наши услуги</h2>
            <p className="text-xl text-gray-600">Полный спектр услуг для вашего автомобиля</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 border-gray-100 hover:border-blue-200 transition-colors cursor-pointer" onClick={() => handleServiceClick('maintenance')}>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center">
                  <Icon name="Car" className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Техобслуживание</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Плановое ТО, замена масла, фильтров, диагностика систем
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100 hover:border-blue-200 transition-colors cursor-pointer" onClick={() => handleServiceClick('diagnostics')}>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 bg-purple-50 rounded-full w-16 h-16 flex items-center justify-center">
                  <Icon name="Gauge" className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Диагностика</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Компьютерная диагностика, проверка систем, выявление неисправностей
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100 hover:border-blue-200 transition-colors cursor-pointer" onClick={() => handleServiceClick('engine')}>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 bg-red-50 rounded-full w-16 h-16 flex items-center justify-center">
                  <Icon name="Settings" className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-xl">Ремонт двигателя</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Капитальный ремонт, замена деталей, восстановление мощности
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100 hover:border-blue-200 transition-colors cursor-pointer" onClick={() => handleServiceClick('transmission')}>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 bg-green-50 rounded-full w-16 h-16 flex items-center justify-center">
                  <Icon name="Cog" className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Ремонт трансмиссии</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Ремонт КПП, сцепления, приводов, замена масла
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100 hover:border-blue-200 transition-colors cursor-pointer" onClick={() => handleServiceClick('suspension')}>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 bg-yellow-50 rounded-full w-16 h-16 flex items-center justify-center">
                  <Icon name="Wrench" className="h-8 w-8 text-yellow-600" />
                </div>
                <CardTitle className="text-xl">Ремонт ходовой</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Амортизаторы, стойки, пружины, рычаги, рулевое управление
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100 hover:border-blue-200 transition-colors cursor-pointer" onClick={() => handleServiceClick('tires')}>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 bg-orange-50 rounded-full w-16 h-16 flex items-center justify-center">
                  <Icon name="CircleDot" className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Шиномонтаж</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Замена шин, балансировка, ремонт проколов, хранение колес
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Online Booking Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Онлайн запись</h2>
              <p className="text-xl text-gray-600">Запишитесь на удобное время всего за 2 минуты</p>
            </div>
            
            <Card className="border-2 border-blue-100">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Записаться на обслуживание</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input id="name" placeholder="Ваше имя" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" placeholder="+7 (999) 123-45-67" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="car">Автомобиль</Label>
                  <Input id="car" placeholder="Марка и модель автомобиля" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="service">Услуга</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите услугу" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maintenance">Техобслуживание</SelectItem>
                      <SelectItem value="diagnostics">Диагностика</SelectItem>
                      <SelectItem value="engine">Ремонт двигателя</SelectItem>
                      <SelectItem value="transmission">Ремонт трансмиссии</SelectItem>
                      <SelectItem value="suspension">Ремонт ходовой</SelectItem>
                      <SelectItem value="tires">Шиномонтаж</SelectItem>
                      <SelectItem value="other">Другое</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Описание проблемы</Label>
                  <Textarea id="message" placeholder="Опишите что случилось с автомобилем" />
                </div>
                
                <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                  <Icon name="Send" className="mr-2 h-5 w-5" />
                  Отправить заявку
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Почему выбирают нас</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
                <p className="text-gray-600">лет опыта</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                <p className="text-gray-600">довольных клиентов</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
                <p className="text-gray-600">техподдержка</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Wrench" className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">ГРМ - Гаражная Ремонтная Мастерская</span>
              </div>
              <p className="text-gray-400">
                Профессиональный автосервис с 15-летним опытом работы
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Услуги</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Техобслуживание</li>
                <li>Диагностика</li>
                <li>Ремонт двигателя</li>
                <li>Ремонт трансмиссии</li>
                <li>Ремонт ходовой</li>
                <li>Шиномонтаж</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Контакты</h3>
              <ul className="space-y-2 text-gray-400">
                <li>+7 (495) 123-45-67</li>
                <li>info@autoservice.ru</li>
                <li>г. Воронеж, ул. Кривошеина, 9Е</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Режим работы</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Пн-Пт: 8:00 - 20:00</li>
                <li>Сб: 9:00 - 18:00</li>
                <li>Вс: 10:00 - 16:00</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ГРМ - Гаражная Ремонтная Мастерская. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
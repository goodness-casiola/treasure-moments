import React, { useState, useEffect, useMemo } from 'react';
import {
  Sun,
  TreePine,
  Gift,
  CalendarHeart,
  Plus,
  ChevronRight,
  Trash2,
  Clock,
  Heart,
  Ghost,
  Image as ImageIcon,
  Loader2,
  Flower2,
  Star,
  BookOpen,
  Utensils,
  Plane,
  Map,
  Users,
  Bell,
  BellRing,
  X,
  CheckCircle2,
  Pencil,
  AlertTriangle,
} from 'lucide-react';

// --- Constants & Config ---
const MS_PER_DAY = 1000 * 60 * 60 * 24;

const LOVED_ONE_TYPES = [
  { id: 'child', label: 'Child', defaultAge: 18 },
  { id: 'partner', label: 'Partner / Spouse', defaultAge: 85 },
  { id: 'parent', label: 'Parent', defaultAge: 85 },
  { id: 'grandparent', label: 'Grandparent', defaultAge: 90 },
  { id: 'pet', label: 'Pet (Dog/Cat)', defaultAge: 15 },
  { id: 'friend', label: 'Friend', defaultAge: 85 },
  { id: 'self', label: 'Myself', defaultAge: 85 },
];

const EVENTS = [
  {
    id: 'birthday',
    name: 'Birthday',
    icon: Gift,
    color: 'text-rose-500',
    iconBg: 'bg-rose-100',
    bg: 'bg-gradient-to-br from-rose-100 to-pink-50 border-pink-100',
    isDynamic: true,
    types: [
      'child',
      'partner',
      'parent',
      'grandparent',
      'pet',
      'friend',
      'self',
    ],
    memoryUrl:
      'https://images.unsplash.com/photo-1530103862676-de8892b07fcc?w=400&q=80',
  },
  {
    id: 'valentines',
    name: "Valentine's Day",
    icon: Heart,
    color: 'text-pink-500',
    iconBg: 'bg-pink-100',
    bg: 'bg-gradient-to-br from-pink-100 to-rose-50 border-pink-100',
    month: 2,
    day: 14,
    types: ['partner', 'self'],
    memoryUrl:
      'https://images.unsplash.com/photo-1518192161663-5a823b2b7b51?w=400&q=80',
  },
  {
    id: 'spring_break',
    name: 'Spring Break',
    icon: Plane,
    color: 'text-sky-500',
    iconBg: 'bg-sky-100',
    bg: 'bg-gradient-to-br from-sky-100 to-cyan-50 border-sky-100',
    month: 3,
    day: 15,
    types: ['child', 'self'],
    memoryUrl:
      'https://images.unsplash.com/photo-1605557201173-0402e3b1c110?w=400&q=80',
  },
  {
    id: 'mothers_day',
    name: "Mother's Day",
    icon: Flower2,
    color: 'text-fuchsia-500',
    iconBg: 'bg-fuchsia-100',
    bg: 'bg-gradient-to-br from-fuchsia-100 to-pink-50 border-fuchsia-100',
    month: 5,
    day: 12,
    types: ['child', 'parent', 'grandparent', 'self'],
    memoryUrl:
      'https://images.unsplash.com/photo-1558285549-2a05f1db1e2c?w=400&q=80',
  },
  {
    id: 'fathers_day',
    name: "Father's Day",
    icon: Star,
    color: 'text-blue-500',
    iconBg: 'bg-blue-100',
    bg: 'bg-gradient-to-br from-blue-100 to-sky-50 border-blue-100',
    month: 6,
    day: 16,
    types: ['child', 'parent', 'grandparent', 'self'],
    memoryUrl:
      'https://images.unsplash.com/photo-1472288939626-444fcce22204?w=400&q=80',
  },
  {
    id: 'summer',
    name: 'Summer',
    icon: Sun,
    color: 'text-amber-500',
    iconBg: 'bg-amber-100',
    bg: 'bg-gradient-to-br from-amber-100 to-orange-50 border-orange-100',
    month: 6,
    day: 21,
    types: [
      'child',
      'partner',
      'parent',
      'grandparent',
      'pet',
      'friend',
      'self',
    ],
    memoryUrl:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80',
  },
  {
    id: 'school',
    name: 'First School Day',
    icon: BookOpen,
    color: 'text-indigo-500',
    iconBg: 'bg-indigo-100',
    bg: 'bg-gradient-to-br from-indigo-100 to-purple-50 border-indigo-100',
    month: 8,
    day: 25,
    types: ['child'],
    memoryUrl:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80',
  },
  {
    id: 'halloween',
    name: 'Halloween',
    icon: Ghost,
    color: 'text-orange-500',
    iconBg: 'bg-orange-100',
    bg: 'bg-gradient-to-br from-orange-100 to-amber-50 border-amber-100',
    month: 10,
    day: 31,
    types: ['child', 'partner', 'pet', 'friend', 'self'],
    memoryUrl:
      'https://images.unsplash.com/photo-1508362544258-0599a0ed124c?w=400&q=80',
  },
  {
    id: 'thanksgiving',
    name: 'Thanksgiving',
    icon: Utensils,
    color: 'text-amber-700',
    iconBg: 'bg-amber-200',
    bg: 'bg-gradient-to-br from-amber-200 to-orange-100 border-amber-200',
    month: 11,
    day: 26,
    types: ['child', 'partner', 'parent', 'grandparent', 'friend', 'self'],
    memoryUrl:
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&q=80',
  },
  {
    id: 'christmas',
    name: 'Christmas',
    icon: TreePine,
    color: 'text-emerald-600',
    iconBg: 'bg-emerald-100',
    bg: 'bg-gradient-to-br from-emerald-100 to-teal-50 border-teal-100',
    month: 12,
    day: 25,
    types: [
      'child',
      'partner',
      'parent',
      'grandparent',
      'pet',
      'friend',
      'self',
    ],
    memoryUrl:
      'https://images.unsplash.com/photo-1543332143-4e8c27e3256f?w=400&q=80',
  },
];

const QUOTES = [
  'The days are long, but the years are short.',
  'You will never have this day with them again. Tomorrow, they will be a little older than they were today.',
  'Treasure the little things, for one day you may look back and realize they were the big things.',
  'Time is the most valuable thing a person can spend.',
  "We didn't realize we were making memories, we just knew we were having fun.",
  'The best thing to spend on your loved ones is your time.',
];

// --- Helper Functions ---
const calculateEventStats = (dobDate, eventMonth, eventDate, targetAge) => {
  const cutoffDate = new Date(
    dobDate.getFullYear() + targetAge,
    dobDate.getMonth(),
    dobDate.getDate()
  );
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  let total = 0;
  let remaining = 0;
  let nextOccurrence = null;
  let minDaysUntil = Infinity;

  for (
    let year = dobDate.getFullYear();
    year <= dobDate.getFullYear() + targetAge;
    year++
  ) {
    const eventThisYear = new Date(year, eventMonth - 1, eventDate);

    if (eventThisYear >= dobDate && eventThisYear < cutoffDate) {
      total++;
      if (eventThisYear >= now) {
        remaining++;
        const diffTime = eventThisYear.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / MS_PER_DAY);

        if (diffDays >= 0 && diffDays < minDaysUntil) {
          minDaysUntil = diffDays;
          nextOccurrence = eventThisYear;
        }
      }
    }
  }

  return { total, remaining, nextOccurrence, daysUntil: minDaysUntil };
};

const calculateCustomEventStats = (dobDate, eventDateStr, targetAge) => {
  const cutoffDate = new Date(
    dobDate.getFullYear() + targetAge,
    dobDate.getMonth(),
    dobDate.getDate()
  );
  const eventDate = new Date(eventDateStr);
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  let total = 0;
  let remaining = 0;
  let nextOccurrence = null;
  let minDaysUntil = Infinity;

  for (
    let year = eventDate.getFullYear();
    year <= cutoffDate.getFullYear();
    year++
  ) {
    const eventThisYear = new Date(
      year,
      eventDate.getMonth(),
      eventDate.getDate()
    );

    if (eventThisYear >= eventDate && eventThisYear < cutoffDate) {
      total++;
      if (eventThisYear >= now) {
        remaining++;
        const diffTime = eventThisYear.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / MS_PER_DAY);

        if (diffDays >= 0 && diffDays < minDaysUntil) {
          minDaysUntil = diffDays;
          nextOccurrence = eventThisYear;
        }
      }
    }
  }

  const nextAnniversaryCount = nextOccurrence
    ? nextOccurrence.getFullYear() - eventDate.getFullYear()
    : null;

  return {
    total,
    remaining,
    nextOccurrence,
    daysUntil: minDaysUntil,
    nextAnniversaryCount,
    isCustom: true,
  };
};

const calculateWeekends = (dobDate, targetAge) => {
  const cutoffDate = new Date(
    dobDate.getFullYear() + targetAge,
    dobDate.getMonth(),
    dobDate.getDate()
  );
  const now = new Date();

  const totalMs = cutoffDate.getTime() - dobDate.getTime();
  const totalWeeks = Math.floor(totalMs / (MS_PER_DAY * 7));

  const passedMs = Math.max(
    0,
    Math.min(now.getTime() - dobDate.getTime(), totalMs)
  );
  const passedWeeks = Math.floor(passedMs / (MS_PER_DAY * 7));

  return {
    total: totalWeeks,
    passed: passedWeeks,
    remaining: totalWeeks - passedWeeks,
  };
};

const calculateLongWeekends = (dobDate, targetAge) => {
  const cutoffDate = new Date(
    dobDate.getFullYear() + targetAge,
    dobDate.getMonth(),
    dobDate.getDate()
  );
  const now = new Date();
  const LONG_WEEKENDS_PER_YEAR = 8;

  const total = targetAge * LONG_WEEKENDS_PER_YEAR;
  const passedMs = Math.max(
    0,
    Math.min(
      now.getTime() - dobDate.getTime(),
      cutoffDate.getTime() - dobDate.getTime()
    )
  );
  const passedYears = passedMs / (MS_PER_DAY * 365.25);
  const passed = Math.floor(passedYears * LONG_WEEKENDS_PER_YEAR);

  return { total, passed, remaining: total - passed };
};

const generateMockMemory = (dobString, eventUrl) => {
  if (!dobString || !eventUrl) return null;
  const dobYear = new Date(dobString).getFullYear();
  const currentYear = new Date().getFullYear();

  const maxYearsAgo = currentYear - dobYear;
  if (maxYearsAgo <= 0) return null;

  const yearsAgo = Math.floor(Math.random() * maxYearsAgo) + 1;
  const memoryYear = currentYear - yearsAgo;
  const memoryAge = memoryYear - dobYear;

  if (memoryAge < 0) return null;
  return { year: memoryYear, age: memoryAge, url: eventUrl };
};

// --- Sub-Components ---
const CircularProgress = ({ total, remaining, colorClass, icon: Icon }) => {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const passed = total - remaining;
  const percentage = Math.max(
    0,
    Math.min(100, (passed / Math.max(1, total)) * 100)
  );
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const baseColorMatch = colorClass.match(/text-([a-z]+-\d+)/);
  const strokeColorClass = baseColorMatch
    ? `stroke-${baseColorMatch[1]}`
    : 'stroke-current';
  const textColorClass = baseColorMatch
    ? `text-${baseColorMatch[1]}`
    : 'text-current';

  return (
    <div className="relative flex items-center justify-center w-24 h-24 flex-shrink-0">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
        <circle
          className="stroke-slate-100"
          strokeWidth="6"
          fill="transparent"
          r={radius}
          cx="40"
          cy="40"
        />
        <circle
          className={`${strokeColorClass} drop-shadow-sm transition-all duration-1000 ease-out`}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          fill="transparent"
          r={radius}
          cx="40"
          cy="40"
        />
      </svg>
      <div
        className={`absolute flex flex-col items-center justify-center ${textColorClass}`}
      >
        {Icon ? <Icon size={20} className="mb-0.5 opacity-80" /> : null}
      </div>
    </div>
  );
};

const DotGrid = ({ total, remaining, icon: Icon, colorClass, iconBg }) => {
  const passed = total - remaining;
  const items = Array.from({ length: total }, (_, i) => i < passed);

  return (
    <div className="flex flex-wrap gap-2.5 mt-4">
      {items.map((isPassed, i) => (
        <div
          key={i}
          className={`transition-all duration-500 flex items-center justify-center ${
            isPassed
              ? 'opacity-40 grayscale scale-95'
              : `opacity-100 ${colorClass} scale-110 drop-shadow-md`
          }`}
        >
          {Icon ? (
            <div
              className={`p-1.5 rounded-xl ${
                isPassed ? 'bg-slate-100' : iconBg
              }`}
            >
              <Icon size={20} strokeWidth={isPassed ? 1.5 : 2.5} />
            </div>
          ) : (
            <div
              className={`w-3 h-3 rounded-full ${
                isPassed ? 'bg-slate-200' : colorClass.replace('text-', 'bg-')
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const WeekendGrid = ({ total, passed }) => {
  const boxes = Array.from({ length: total }, (_, i) => i < passed);
  return (
    <div className="flex flex-wrap gap-[3px] mt-4 max-w-full">
      {boxes.map((isPassed, i) => (
        <div
          key={i}
          className={`w-[6px] h-[6px] sm:w-2 sm:h-2 rounded-sm transition-colors ${
            isPassed
              ? 'bg-slate-200/70'
              : 'bg-gradient-to-br from-teal-400 to-emerald-400 shadow-sm'
          }`}
          title={`Weekend ${i + 1}`}
        />
      ))}
    </div>
  );
};

const LongWeekendGrid = ({ total, passed }) => {
  const boxes = Array.from({ length: total }, (_, i) => i < passed);
  return (
    <div className="flex flex-wrap gap-1.5 mt-4 max-w-full">
      {boxes.map((isPassed, i) => (
        <div
          key={i}
          className={`w-3 h-2 sm:w-4 sm:h-2.5 rounded-sm transition-colors ${
            isPassed
              ? 'bg-slate-200/70'
              : 'bg-gradient-to-br from-indigo-400 to-purple-400 shadow-sm'
          }`}
          title={`Long Weekend ${i + 1}`}
        />
      ))}
    </div>
  );
};

// --- View Components ---

const PersonDashboard = ({
  person,
  stats,
  photosConnected,
  onDelete,
  onEdit,
  onUpdatePerson,
  onConnectPhotos,
}) => {
  const mockMemory = useMemo(
    () => generateMockMemory(person.dob, stats.nextEvent?.memoryUrl),
    [person.dob, stats.nextEvent]
  );
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEventName, setNewEventName] = useState('');
  const [newEventDate, setNewEventDate] = useState('');

  const personMemories = useMemo(() => {
    if (!photosConnected || !stats || !stats.events) return [];
    let memories = [];
    const shuffledEvents = [...stats.events]
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);

    shuffledEvents.forEach((evt) => {
      if (!evt.memoryUrl) return;
      const memory = generateMockMemory(person.dob, evt.memoryUrl);
      if (memory) {
        memories.push({
          id: crypto.randomUUID(),
          eventName: evt.name,
          ...memory,
        });
      }
    });

    return memories.sort(() => 0.5 - Math.random());
  }, [person.dob, stats, photosConnected]);

  const handleAddCustomEvent = (e) => {
    e.preventDefault();
    if (!newEventName || !newEventDate) return;

    const newEvent = {
      id: `custom_${crypto.randomUUID()}`,
      name: newEventName,
      date: newEventDate,
    };
    onUpdatePerson({
      ...person,
      customEvents: [...(person.customEvents || []), newEvent],
    });
    setIsAddingEvent(false);
    setNewEventName('');
    setNewEventDate('');
  };

  const personText =
    person.type === 'self' ? 'left to experience' : `left with ${person.name}`;
  const turnText =
    person.type === 'self'
      ? `before you turn ${person.targetAge}`
      : `before they turn ${person.targetAge}`;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between bg-white/40 backdrop-blur-md border border-white px-6 py-4 rounded-3xl shadow-sm">
        <h2 className="text-xl md:text-2xl font-serif text-slate-800">
          {person.type === 'self' ? (
            <>
              My{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600 font-bold">
                Timeline
              </span>
            </>
          ) : (
            <>
              Time with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600 font-bold">
                {person.name}
              </span>
            </>
          )}
        </h2>
        <div className="flex gap-1">
          <button
            onClick={onEdit}
            className="p-2 text-slate-400 hover:text-indigo-500 transition-all rounded-full hover:bg-indigo-50"
            title="Edit Profile"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-slate-400 hover:text-red-500 transition-all rounded-full hover:bg-red-50"
            title="Delete Profile"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {stats.nextEvent && (
        <div
          className={`rounded-[2rem] p-6 md:p-10 ${stats.nextEvent.bg} border border-white shadow-xl shadow-slate-200/50 overflow-hidden relative group`}
        >
          <stats.nextEvent.icon
            size={200}
            className={`absolute -right-8 -bottom-12 opacity-10 ${stats.nextEvent.color} group-hover:scale-110 transition-transform duration-700`}
          />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div
                  className={`p-2.5 bg-white/80 rounded-2xl ${stats.nextEvent.color} backdrop-blur-md shadow-sm`}
                >
                  <stats.nextEvent.icon size={24} />
                </div>
                <span
                  className={`font-bold tracking-widest uppercase text-xs ${stats.nextEvent.color} bg-white/50 px-3 py-1.5 rounded-full backdrop-blur-sm`}
                >
                  Upcoming{' '}
                  {stats.nextEvent.daysUntil === 0
                    ? 'Today!'
                    : `in ${stats.nextEvent.daysUntil} days`}
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-serif text-slate-900 mb-3 leading-tight font-medium">
                {stats.nextEvent.name} is almost here.
              </h3>
              <p className="text-slate-700 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
                You have exactly{' '}
                <strong
                  className={`font-bold ${stats.nextEvent.color} text-2xl`}
                >
                  {stats.nextEvent.remaining}
                </strong>{' '}
                {stats.nextEvent.name.toLowerCase()}s {personText} {turnText}.
                Make this one unforgettable.
              </p>
            </div>

            {photosConnected && mockMemory && (
              <div className="flex justify-center md:justify-end animate-in fade-in slide-in-from-right-8 duration-1000">
                <div className="bg-white p-3 pb-8 rounded-sm shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full max-w-[240px] border border-slate-100 relative before:absolute before:-inset-2 before:bg-white/20 before:backdrop-blur-sm before:rounded-lg before:-z-10 rotate-2 hover:rotate-0">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-slate-200/50 rounded-full blur-[1px]"></div>
                  <img
                    src={mockMemory.url}
                    alt={`Memory`}
                    className="w-full h-48 md:h-56 object-cover rounded shadow-inner bg-slate-100"
                  />
                  <div className="mt-4 px-2 text-center">
                    <p className="font-serif text-slate-800 text-lg font-medium">
                      {stats.nextEvent.name} {mockMemory.year}
                    </p>
                    <p className="text-slate-500 text-sm font-light mt-0.5 flex items-center justify-center gap-1.5">
                      <Clock size={12} /> {person.name} was {mockMemory.age}{' '}
                      {mockMemory.age === 1 ? 'year' : 'years'} old
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <div className="md:col-span-2 bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 md:p-10 border border-white shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-slate-200/50 transition-shadow duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div>
              <h3 className="text-xl md:text-2xl font-serif text-slate-900 mb-2 flex items-center gap-3">
                <div className="p-2.5 bg-teal-50 rounded-xl">
                  <CalendarHeart size={20} className="text-teal-500" />
                </div>{' '}
                Weekends
              </h3>
              <p className="text-slate-500 text-sm md:text-base">
                Every small block represents one weekend from birth to age{' '}
                {person.targetAge}.
              </p>
            </div>
            <div className="text-right flex-shrink-0 bg-gradient-to-br from-slate-50 to-slate-100/50 border border-white px-5 py-3 rounded-2xl shadow-sm">
              <div className="text-3xl md:text-4xl font-serif text-slate-900 leading-none mb-1 font-medium">
                {stats.weekends.remaining}
              </div>
              <div className="text-[10px] md:text-xs uppercase tracking-widest text-slate-400 font-bold">
                Remaining
              </div>
            </div>
          </div>
          <WeekendGrid
            total={stats.weekends.total}
            passed={stats.weekends.passed}
          />
        </div>

        <div className="md:col-span-2 bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 md:p-10 border border-white shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-slate-200/50 transition-shadow duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div>
              <h3 className="text-xl md:text-2xl font-serif text-slate-900 mb-2 flex items-center gap-3">
                <div className="p-2.5 bg-indigo-50 rounded-xl">
                  <Map className="text-indigo-500" size={20} />
                </div>{' '}
                Long Weekends
              </h3>
              <p className="text-slate-500 text-sm md:text-base">
                Long weekends and holidays to plan getaways together.
              </p>
            </div>
            <div className="text-right flex-shrink-0 bg-gradient-to-br from-slate-50 to-slate-100/50 border border-white px-5 py-3 rounded-2xl shadow-sm">
              <div className="text-3xl md:text-4xl font-serif text-slate-900 leading-none mb-1 font-medium">
                {stats.longWeekends.remaining}
              </div>
              <div className="text-[10px] md:text-xs uppercase tracking-widest text-slate-400 font-bold">
                Remaining
              </div>
            </div>
          </div>
          <LongWeekendGrid
            total={stats.longWeekends.total}
            passed={stats.longWeekends.passed}
          />
        </div>

        {stats.events.map((event) => (
          <div
            key={event.id}
            className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-white shadow-xl shadow-slate-200/40 flex flex-col h-full hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-serif text-slate-900 flex items-center gap-2.5 mb-1.5">
                  <div className={`p-2 rounded-xl ${event.iconBg}`}>
                    <event.icon size={20} className={event.color} />
                  </div>
                  {event.name}
                  {event.isCustom ? '' : 's'}
                </h3>
                <p className="text-sm text-slate-500">
                  {event.isCustom && event.nextAnniversaryCount
                    ? `Next is anniversary #${event.nextAnniversaryCount}. `
                    : ''}
                  {event.remaining === 0
                    ? `All ${event.total} celebrated.`
                    : `${event.remaining} out of ${event.total} remaining.`}
                </p>
              </div>
              <div
                className={`text-4xl font-serif font-medium drop-shadow-sm flex flex-col items-end ${
                  event.remaining > 0 ? event.color : 'text-slate-300'
                }`}
              >
                {event.remaining}
              </div>
            </div>
            <div className="flex-grow flex items-end">
              <DotGrid
                total={event.total}
                remaining={event.remaining}
                icon={event.icon}
                colorClass={event.color}
                iconBg={event.iconBg}
              />
            </div>
          </div>
        ))}

        <div className="md:col-span-2 bg-white/40 backdrop-blur-md rounded-[2rem] p-6 border border-white border-dashed flex flex-col justify-center items-center text-center mt-2 mb-8">
          {!isAddingEvent ? (
            <button
              onClick={() => setIsAddingEvent(true)}
              className="text-indigo-600 font-medium flex items-center gap-2 hover:text-indigo-700 transition-colors py-2 px-4 rounded-full hover:bg-indigo-50"
            >
              <Plus size={18} /> Add Special Moment (Anniversary, etc.)
            </button>
          ) : (
            <form
              onSubmit={handleAddCustomEvent}
              className="w-full max-w-md space-y-4 animate-in fade-in zoom-in-95"
            >
              <h4 className="font-serif text-slate-800 text-lg mb-2">
                New Special Moment
              </h4>
              <input
                type="text"
                value={newEventName}
                onChange={(e) => setNewEventName(e.target.value)}
                placeholder="Event Name (e.g., Anniversary)"
                className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 outline-none"
                required
              />
              <input
                type="date"
                value={newEventDate}
                onChange={(e) => setNewEventDate(e.target.value)}
                className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 outline-none"
                required
              />
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingEvent(false)}
                  className="px-4 py-2 text-slate-500 hover:text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm"
                >
                  Save Moment
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <h3 className="text-lg font-serif text-slate-600 pl-4 pt-6 flex items-center gap-2">
        <ImageIcon size={18} className="text-rose-400" /> Memories with{' '}
        {person.name}
      </h3>

      {!photosConnected ? (
        <div className="bg-white/40 backdrop-blur-md rounded-[2rem] p-8 border border-white shadow-sm flex flex-col items-center text-center">
          <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
            <ImageIcon size={24} />
          </div>
          <h4 className="font-serif text-xl text-slate-800 mb-2">
            Connect Your Photos
          </h4>
          <p className="text-slate-500 max-w-sm mb-6 text-sm">
            See precious past moments mixed into your timeline to remind you how
            beautifully fast time goes.
          </p>
          <button
            onClick={onConnectPhotos}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors shadow-md shadow-indigo-200 text-sm flex items-center gap-2"
          >
            Connect Photos
          </button>
        </div>
      ) : (
        <div
          className="flex overflow-x-auto pb-10 pt-4 px-6 -mx-6 snap-x snap-mandatory gap-5 hide-scroll touch-pan-x"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {personMemories.length > 0 ? (
            personMemories.map((mem, i) => (
              <div
                key={mem.id}
                className="snap-center shrink-0 animate-in fade-in slide-in-from-bottom-8"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div
                  className={`bg-white p-2.5 pb-8 rounded-sm shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 w-56 border border-slate-100 relative ${
                    i % 2 === 0 ? 'rotate-1' : '-rotate-1'
                  } hover:rotate-0 z-10 hover:z-20`}
                >
                  <img
                    src={mem.url}
                    alt={mem.eventName}
                    className="w-full h-44 object-cover rounded shadow-inner bg-slate-100 pointer-events-none"
                  />
                  <div className="mt-3 px-2 text-center">
                    <p className="font-serif text-slate-800 text-base font-medium">
                      {mem.eventName}
                    </p>
                    <p className="text-slate-500 text-xs font-light mt-0.5">
                      {mem.year} •{' '}
                      {person.type === 'self' ? 'You' : person.name}{' '}
                      {person.type === 'self' ? 'were' : 'was'} {mem.age}{' '}
                      {mem.age === 1 ? 'yr' : 'yrs'} old
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full text-center py-8 text-slate-400 text-sm">
              No memories available for {person.name} yet. Check back later!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const OverviewDashboard = ({
  allStats,
  photosConnected,
  onConnectPhotos,
  onNavigate,
}) => {
  const globalNext = useMemo(() => {
    return allStats.reduce((min, curr) => {
      if (!curr.nextEvent) return min;
      if (!min || curr.nextEvent.daysUntil < min.nextEvent.daysUntil)
        return curr;
      return min;
    }, null);
  }, [allStats]);

  const mockMemory = useMemo(() => {
    if (!globalNext) return null;
    return generateMockMemory(
      globalNext.person.dob,
      globalNext.nextEvent.memoryUrl
    );
  }, [globalNext]);

  const randomMemories = useMemo(() => {
    if (!photosConnected || allStats.length === 0) return [];
    let memories = [];
    allStats.forEach((statObj) => {
      const shuffledEvents = [...statObj.events]
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);
      shuffledEvents.forEach((evt) => {
        if (!evt.memoryUrl) return;
        const memory = generateMockMemory(statObj.person.dob, evt.memoryUrl);
        if (memory) {
          memories.push({
            id: crypto.randomUUID(),
            person: statObj.person,
            eventName: evt.name,
            ...memory,
          });
        }
      });
    });
    return memories.sort(() => 0.5 - Math.random());
  }, [allStats, photosConnected]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {globalNext && (
        <div
          onClick={() => onNavigate(globalNext.person.id)}
          className={`cursor-pointer rounded-[2rem] p-6 md:p-10 ${globalNext.nextEvent.bg} border border-white shadow-xl shadow-slate-200/50 overflow-hidden relative group hover:shadow-2xl transition-all duration-300`}
        >
          <globalNext.nextEvent.icon
            size={200}
            className={`absolute -right-8 -bottom-12 opacity-10 ${globalNext.nextEvent.color} group-hover:scale-110 transition-transform duration-700`}
          />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div
                  className={`p-2 bg-white/80 rounded-2xl ${globalNext.nextEvent.color} backdrop-blur-md shadow-sm`}
                >
                  <globalNext.nextEvent.icon size={20} />
                </div>
                <span
                  className={`font-bold tracking-widest uppercase text-[10px] md:text-xs ${globalNext.nextEvent.color} bg-white/50 px-3 py-1.5 rounded-full backdrop-blur-sm`}
                >
                  Next in circle
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-serif text-slate-900 mb-3 leading-tight font-medium group-hover:underline decoration-2 underline-offset-4">
                {globalNext.person.name}'s {globalNext.nextEvent.name}
              </h3>
              <p className="text-slate-700 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
                Coming up in just{' '}
                <strong className={`font-bold ${globalNext.nextEvent.color}`}>
                  {globalNext.nextEvent.daysUntil} days
                </strong>
                . You have{' '}
                <strong className={`font-bold ${globalNext.nextEvent.color}`}>
                  {globalNext.nextEvent.remaining}
                </strong>{' '}
                {globalNext.nextEvent.name.toLowerCase()}s{' '}
                {globalNext.person.type === 'self'
                  ? 'left to experience'
                  : `left with ${globalNext.person.name}`}
                .
              </p>
            </div>

            {photosConnected && mockMemory && (
              <div className="flex justify-center md:justify-end animate-in fade-in slide-in-from-right-8 duration-1000">
                <div className="bg-white p-3 pb-8 rounded-sm shadow-xl hover:shadow-2xl transition-all duration-300 w-full max-w-[220px] border border-slate-100 relative before:absolute before:-inset-2 before:bg-white/20 before:backdrop-blur-sm before:rounded-lg before:-z-10 rotate-3 group-hover:rotate-0">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-slate-200/50 rounded-full blur-[1px]"></div>
                  <img
                    src={mockMemory.url}
                    alt={`Memory`}
                    className="w-full h-44 md:h-52 object-cover rounded shadow-inner bg-slate-100 pointer-events-none"
                  />
                  <div className="mt-3 px-2 text-center">
                    <p className="font-serif text-slate-800 text-lg font-medium">
                      {globalNext.nextEvent.name} {mockMemory.year}
                    </p>
                    <p className="text-slate-500 text-xs font-light mt-0.5 flex items-center justify-center gap-1">
                      <Clock size={10} /> {globalNext.person.name} was{' '}
                      {mockMemory.age} {mockMemory.age === 1 ? 'yr' : 'yrs'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <h3 className="text-lg font-serif text-slate-600 pl-4 pt-4">
        Treasured Highlights
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {allStats.map((statObj, i) => {
          const styleType = i % 3;

          if (styleType === 0) {
            return (
              <div
                key={statObj.person.id}
                onClick={() => onNavigate(statObj.person.id)}
                className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 border border-white shadow-lg shadow-slate-200/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex items-center justify-between cursor-pointer group"
              >
                <div>
                  <h4 className="text-lg font-serif text-slate-900 mb-1 group-hover:text-teal-600 transition-colors">
                    {statObj.person.name}
                  </h4>
                  <p className="text-sm text-slate-500 flex items-center gap-1.5 mb-2">
                    <CalendarHeart size={14} className="text-teal-500" />{' '}
                    Weekends
                  </p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-serif text-teal-500 font-medium leading-none">
                      {statObj.weekends.remaining}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      left
                    </span>
                  </div>
                </div>
                <CircularProgress
                  total={statObj.weekends.total}
                  remaining={statObj.weekends.remaining}
                  colorClass="text-teal-400"
                  icon={CalendarHeart}
                />
              </div>
            );
          } else if (styleType === 1) {
            const highlightEvent =
              statObj.events.find((e) => e.remaining > 0) || statObj.events[0];
            if (!highlightEvent) return null;
            return (
              <div
                key={statObj.person.id}
                onClick={() => onNavigate(statObj.person.id)}
                className={`rounded-[2rem] p-6 ${highlightEvent.bg} border border-white shadow-lg shadow-slate-200/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex items-center justify-between cursor-pointer group`}
              >
                <div>
                  <h4 className="text-lg font-serif text-slate-900 mb-1 group-hover:opacity-80 transition-opacity">
                    {statObj.person.name}
                  </h4>
                  <p
                    className={`text-sm flex items-center gap-1.5 mb-2 ${highlightEvent.color}`}
                  >
                    <highlightEvent.icon size={14} /> {highlightEvent.name}
                    {highlightEvent.isCustom ? '' : 's'}
                  </p>
                  <div className="flex items-baseline gap-1.5">
                    <span
                      className={`text-3xl font-serif font-medium leading-none ${highlightEvent.color}`}
                    >
                      {highlightEvent.remaining}
                    </span>
                    <span
                      className={`text-xs font-medium opacity-60 ${highlightEvent.color}`}
                    >
                      left
                    </span>
                  </div>
                </div>
                <CircularProgress
                  total={highlightEvent.total}
                  remaining={highlightEvent.remaining}
                  colorClass={highlightEvent.color}
                  icon={highlightEvent.icon}
                />
              </div>
            );
          } else {
            return (
              <div
                key={statObj.person.id}
                onClick={() => onNavigate(statObj.person.id)}
                className="bg-gradient-to-br from-indigo-50/50 to-purple-50/50 backdrop-blur-xl rounded-[2rem] p-6 border border-white shadow-lg shadow-slate-200/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex items-center justify-between cursor-pointer group"
              >
                <div>
                  <h4 className="text-lg font-serif text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                    {statObj.person.name}
                  </h4>
                  <p className="text-sm text-indigo-500 flex items-center gap-1.5 mb-2">
                    <Map size={14} /> Long Weekends
                  </p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-serif text-indigo-500 font-medium leading-none">
                      {statObj.longWeekends.remaining}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      left
                    </span>
                  </div>
                </div>
                <CircularProgress
                  total={statObj.longWeekends.total}
                  remaining={statObj.longWeekends.remaining}
                  colorClass="text-indigo-400"
                  icon={Map}
                />
              </div>
            );
          }
        })}
      </div>

      <style>{`
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <h3 className="text-lg font-serif text-slate-600 pl-4 pt-6 flex items-center gap-2">
        <ImageIcon size={18} className="text-rose-400" /> Memory Lane
      </h3>

      {!photosConnected ? (
        <div className="bg-white/40 backdrop-blur-md rounded-[2rem] p-8 border border-white shadow-sm flex flex-col items-center text-center">
          <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
            <ImageIcon size={24} />
          </div>
          <h4 className="font-serif text-xl text-slate-800 mb-2">
            Connect Your Photos
          </h4>
          <p className="text-slate-500 max-w-sm mb-6 text-sm">
            See precious past moments mixed into your timeline to remind you how
            beautifully fast time goes.
          </p>
          <button
            onClick={onConnectPhotos}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors shadow-md shadow-indigo-200 text-sm flex items-center gap-2"
          >
            Connect Photos
          </button>
        </div>
      ) : (
        <div
          className="flex overflow-x-auto pb-10 pt-4 px-6 -mx-6 snap-x snap-mandatory gap-5 hide-scroll touch-pan-x"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {randomMemories.length > 0 ? (
            randomMemories.map((mem, i) => (
              <div
                key={mem.id}
                className="snap-center shrink-0 animate-in fade-in slide-in-from-bottom-8"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div
                  className={`bg-white p-2.5 pb-8 rounded-sm shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 w-56 border border-slate-100 relative ${
                    i % 2 === 0 ? 'rotate-1' : '-rotate-1'
                  } hover:rotate-0 z-10 hover:z-20`}
                >
                  <img
                    src={mem.url}
                    alt={mem.eventName}
                    className="w-full h-44 object-cover rounded shadow-inner bg-slate-100 pointer-events-none"
                  />
                  <div className="mt-3 px-2 text-center">
                    <p className="font-serif text-slate-800 text-base font-medium">
                      {mem.person.name}'s {mem.eventName}
                    </p>
                    <p className="text-slate-500 text-xs font-light mt-0.5">
                      {mem.year} • {mem.age} {mem.age === 1 ? 'yr' : 'yrs'} old
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full text-center py-8 text-slate-400 text-sm">
              No memories available yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [lovedOnes, setLovedOnes] = useState(() => {
    try {
      const saved = localStorage.getItem('treasure-moments-loved-ones');
      if (saved) return JSON.parse(saved);
      const oldSaved = localStorage.getItem('treasure-moments-kids');
      if (oldSaved)
        return JSON.parse(oldSaved).map((k) => ({
          ...k,
          type: 'child',
          targetAge: 18,
        }));
      return [];
    } catch {
      return [];
    }
  });

  const [activeId, setActiveId] = useState(() =>
    lovedOnes.length > 1 ? 'overview' : lovedOnes[0]?.id || null
  );
  const [isAdding, setIsAdding] = useState(lovedOnes.length === 0);
  const [newName, setNewName] = useState('');
  const [newDob, setNewDob] = useState('');
  const [newType, setNewType] = useState('child');
  const [newTargetAge, setNewTargetAge] = useState(18);

  const [quote] = useState(() => {
    const lastIndex = parseInt(
      localStorage.getItem('treasure-moments-quote-idx') || '-1',
      10
    );
    const nextIndex = (lastIndex + 1) % QUOTES.length;
    localStorage.setItem('treasure-moments-quote-idx', nextIndex.toString());
    return QUOTES[nextIndex];
  });

  const [photosConnected, setPhotosConnected] = useState(
    () => localStorage.getItem('treasure-moments-photos') === 'true'
  );
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [notifyFreq, setNotifyFreq] = useState(
    () => localStorage.getItem('treasure-moments-notify') || 'seasonally'
  );
  const [toast, setToast] = useState(null);
  const [personToDelete, setPersonToDelete] = useState(null);
  const [editFormData, setEditFormData] = useState(null);

  useEffect(() => {
    localStorage.setItem(
      'treasure-moments-loved-ones',
      JSON.stringify(lovedOnes)
    );
  }, [lovedOnes]);
  useEffect(() => {
    localStorage.setItem('treasure-moments-notify', notifyFreq);
  }, [notifyFreq]);

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleTestNotification = () => {
    const month = new Date().getMonth();
    const seasonal = [
      month >= 2 && month <= 4
        ? 'Spring is blooming! A perfect time to create a colorful memory.'
        : null,
      month >= 5 && month <= 7
        ? 'The summer sun is shining. Soak up a golden moment today.'
        : null,
      month >= 8 && month <= 10
        ? 'Autumn leaves are falling. Take a cozy moment to connect today.'
        : null,
      month === 11 || month <= 1
        ? 'Winter is here. Warm up your day with a shared memory.'
        : null,
    ].filter(Boolean);

    const general = [
      'Take 5 minutes today to just listen. No phones, no distractions.',
      'A simple hug can reduce stress and build connection. Try it today.',
      "You'll never have this exact day again. Make it count.",
    ];

    let specific = [];
    if (lovedOnes.length > 0) {
      const randomPerson =
        lovedOnes[Math.floor(Math.random() * lovedOnes.length)];
      if (randomPerson.type !== 'self') {
        specific.push(
          `Give ${randomPerson.name} an extra moment of your time today. Time is precious.`
        );
      }
    }

    const options = [...seasonal, ...general, ...specific];
    const randomMsg = options[Math.floor(Math.random() * options.length)];

    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted')
          new Notification('Treasure Moments', { body: randomMsg });
        triggerToast('Notification test triggered!');
      });
    } else {
      triggerToast('In-app reminder scheduled!');
    }
  };

  const handleAddLovedOne = (e) => {
    e.preventDefault();
    if (!newName || !newDob) return;
    const newPerson = {
      id: crypto.randomUUID(),
      name: newName,
      dob: newDob,
      type: newType,
      targetAge: parseInt(newTargetAge, 10) || 18,
    };
    const updatedList = [...lovedOnes, newPerson];
    setLovedOnes(updatedList);
    setActiveId(updatedList.length > 1 ? 'overview' : newPerson.id);
    setNewName('');
    setNewDob('');
    setNewType('child');
    setNewTargetAge(18);
    setIsAdding(false);
  };

  const handleDeleteLovedOne = (id) => {
    const updated = lovedOnes.filter((k) => k.id !== id);
    setLovedOnes(updated);
    if (activeId === id) {
      setActiveId(updated.length > 1 ? 'overview' : updated[0]?.id || null);
      if (updated.length === 0) setIsAdding(true);
    }
  };

  const handleConfirmDelete = () => {
    if (personToDelete) {
      handleDeleteLovedOne(personToDelete.id);
      setPersonToDelete(null);
      triggerToast('Profile removed.');
    }
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editFormData.name || !editFormData.dob) return;
    const updatedPerson = {
      ...editFormData,
      targetAge: parseInt(editFormData.targetAge, 10) || 18,
    };
    setLovedOnes((prev) =>
      prev.map((p) => (p.id === updatedPerson.id ? updatedPerson : p))
    );
    setEditFormData(null);
    triggerToast('Profile updated successfully!');
  };

  const handleEditTypeChange = (e) => {
    const type = e.target.value;
    const config = LOVED_ONE_TYPES.find((t) => t.id === type);
    setEditFormData((prev) => ({
      ...prev,
      type,
      targetAge: config ? config.defaultAge : prev.targetAge,
    }));
  };

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setNewType(type);
    const config = LOVED_ONE_TYPES.find((t) => t.id === type);
    if (config) setNewTargetAge(config.defaultAge);
  };

  const handleConnectPhotos = () => {
    if (photosConnected) {
      setPhotosConnected(false);
      localStorage.setItem('treasure-moments-photos', 'false');
      return;
    }
    setIsConnecting(true);
    setTimeout(() => {
      setPhotosConnected(true);
      setIsConnecting(false);
      localStorage.setItem('treasure-moments-photos', 'true');
    }, 1500);
  };

  const allStats = useMemo(() => {
    return lovedOnes.map((person) => {
      const dob = new Date(person.dob);
      const dobParts = person.dob.split('-');
      const bMonth = parseInt(dobParts[1], 10);
      const bDay = parseInt(dobParts[2], 10);

      const applicableEvents = EVENTS.filter((e) =>
        e.types.includes(person.type)
      );
      const allApplicableEvents = [...applicableEvents];

      if (person.customEvents) {
        person.customEvents.forEach((ce) => {
          let stats = ce.date
            ? calculateCustomEventStats(dob, ce.date, person.targetAge)
            : calculateEventStats(dob, ce.month, ce.day, person.targetAge);
          allApplicableEvents.push({
            ...ce,
            icon: Star,
            color: 'text-violet-500',
            iconBg: 'bg-violet-100',
            bg: 'bg-gradient-to-br from-violet-100 to-purple-50 border-violet-100',
            isDynamic: false,
            memoryUrl:
              'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&q=80',
            isCustom: true,
            ...stats,
          });
        });
      }

      const eventData = allApplicableEvents.map((event) => {
        if (event.isCustom) return event;
        const month = event.isDynamic ? bMonth : event.month;
        const day = event.isDynamic ? bDay : event.day;
        return {
          ...event,
          ...calculateEventStats(dob, month, day, person.targetAge),
        };
      });

      const weekends = calculateWeekends(dob, person.targetAge);
      const longWeekends = calculateLongWeekends(dob, person.targetAge);

      const upcomingEvents = eventData
        .filter((e) => e.daysUntil !== Infinity)
        .sort((a, b) => a.daysUntil - b.daysUntil);
      const nextEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : null;

      return { person, events: eventData, weekends, longWeekends, nextEvent };
    });
  }, [lovedOnes]);

  const activeStatsObj = useMemo(
    () => allStats.find((s) => s.person.id === activeId),
    [allStats, activeId]
  );

  if (isAdding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-sky-50 flex items-center justify-center p-6 font-sans text-slate-800">
        <div className="max-w-md w-full bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-purple-100 rounded-[1.25rem] flex items-center justify-center text-rose-500 shadow-inner rotate-3">
              <Heart size={28} fill="currentColor" className="drop-shadow-sm" />
            </div>
          </div>
          <h1 className="text-2xl font-serif text-center font-semibold text-slate-800 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-purple-600">
            Treasure Moments
          </h1>
          <p className="text-center text-slate-500 mb-6 font-light text-sm leading-relaxed">
            Visualize the precious time you have left with your loved ones.
          </p>

          <form onSubmit={handleAddLovedOne} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1 ml-1">
                Name
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-4 py-2.5 bg-white/50 backdrop-blur-sm rounded-xl border border-white focus:ring-2 focus:ring-purple-200 focus:border-purple-400 outline-none transition-all shadow-sm text-sm"
                placeholder="e.g., Leo, Mom, Myself"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1 ml-1">
                  Relationship
                </label>
                <select
                  value={newType}
                  onChange={handleTypeChange}
                  className="w-full px-4 py-2.5 bg-white/50 backdrop-blur-sm rounded-xl border border-white focus:ring-2 focus:ring-purple-200 focus:border-purple-400 outline-none transition-all shadow-sm text-slate-700 text-sm"
                >
                  {LOVED_ONE_TYPES.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1 ml-1">
                  Countdown Age
                </label>
                <input
                  type="number"
                  value={newTargetAge}
                  onChange={(e) => setNewTargetAge(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/50 backdrop-blur-sm rounded-xl border border-white focus:ring-2 focus:ring-purple-200 focus:border-purple-400 outline-none transition-all shadow-sm text-slate-700 text-sm"
                  min="1"
                  max="120"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1 ml-1">
                Date of Birth
              </label>
              <input
                type="date"
                value={newDob}
                onChange={(e) => setNewDob(e.target.value)}
                className="w-full px-4 py-2.5 bg-white/50 backdrop-blur-sm rounded-xl border border-white focus:ring-2 focus:ring-purple-200 focus:border-purple-400 outline-none transition-all shadow-sm text-slate-700 text-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white rounded-xl font-medium transition-all shadow-lg shadow-slate-900/20 mt-4 flex justify-center items-center gap-2 hover:scale-[1.02] text-sm"
            >
              Start Tracking <ChevronRight size={16} />
            </button>
            {lovedOnes.length > 0 && (
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="w-full py-2.5 px-4 text-slate-500 hover:text-slate-700 font-medium transition-colors text-sm"
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/80 via-white to-sky-50/80 text-slate-800 font-sans pb-20 selection:bg-rose-200 overflow-x-hidden">
      <header className="max-w-5xl mx-auto pt-6 pb-2 px-4 sm:px-6">
        <div className="flex flex-col gap-4 mb-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight mb-1 bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 drop-shadow-sm pb-1">
                Treasure Moments
              </h1>
              <p className="text-slate-500 italic font-serif text-sm md:text-base leading-snug line-clamp-1 sm:line-clamp-none max-w-xl">
                "{quote}"
              </p>
            </div>

            <div className="flex flex-row items-center gap-2 w-full sm:w-auto overflow-x-auto hide-scroll pb-1 sm:pb-0">
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="flex-shrink-0 flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-full transition-all shadow-sm border bg-white/80 backdrop-blur-md border-white text-slate-600 hover:bg-white"
              >
                <Bell size={14} />{' '}
                <span className="hidden sm:inline">Reminders</span>
              </button>
              <button
                onClick={handleConnectPhotos}
                disabled={isConnecting}
                className={`flex-shrink-0 flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-full transition-all shadow-sm border ${
                  photosConnected
                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200 text-indigo-600'
                    : 'bg-white/80 backdrop-blur-md border-white text-slate-600 hover:bg-white'
                }`}
              >
                {isConnecting ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <ImageIcon size={14} />
                )}
                {isConnecting ? (
                  '...'
                ) : photosConnected ? (
                  'Photos'
                ) : (
                  <span className="hidden sm:inline">Connect Photos</span>
                )}
              </button>
              <button
                onClick={() => setIsAdding(true)}
                className="flex-shrink-0 flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-white/80 backdrop-blur-md border border-white px-3.5 py-2 rounded-full hover:bg-white shadow-sm"
              >
                <Plus size={14} /> Add
              </button>
            </div>
          </div>
        </div>

        {lovedOnes.length > 1 && (
          <div className="flex gap-2.5 overflow-x-auto pb-3 hide-scroll">
            <button
              onClick={() => setActiveId('overview')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 ${
                activeId === 'overview'
                  ? 'bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-md border-transparent'
                  : 'bg-white/60 backdrop-blur-sm border border-white text-slate-600 hover:bg-white'
              }`}
            >
              <Users size={14} /> Overview
            </button>
            {lovedOnes.map((person) => (
              <button
                key={person.id}
                onClick={() => setActiveId(person.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  activeId === person.id
                    ? 'bg-gradient-to-r from-rose-500 to-purple-500 text-white shadow-md border-transparent'
                    : 'bg-white/60 backdrop-blur-sm border border-white text-slate-600 hover:bg-white'
                }`}
              >
                {person.name}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-2">
        {activeId === 'overview' && allStats.length > 0 ? (
          <OverviewDashboard
            allStats={allStats}
            photosConnected={photosConnected}
            onConnectPhotos={handleConnectPhotos}
            onNavigate={setActiveId}
          />
        ) : (
          activeStatsObj && (
            <PersonDashboard
              person={activeStatsObj.person}
              stats={activeStatsObj}
              photosConnected={photosConnected}
              onDelete={() => setPersonToDelete(activeStatsObj.person)}
              onEdit={() => setEditFormData({ ...activeStatsObj.person })}
              onUpdatePerson={(updatedPerson) => {
                setLovedOnes((prev) =>
                  prev.map((p) =>
                    p.id === updatedPerson.id ? updatedPerson : p
                  )
                );
              }}
              onConnectPhotos={handleConnectPhotos}
            />
          )
        )}
      </main>

      <footer className="text-center py-12 text-slate-400 text-xs font-light">
        <p className="flex items-center justify-center gap-1.5">
          A gentle reminder to be present.{' '}
          <Heart size={12} className="text-rose-300" />
        </p>
      </footer>

      {toast && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2.5 animate-in slide-in-from-bottom-8 fade-in z-50 text-sm font-medium">
          <CheckCircle2 size={16} className="text-emerald-400" />
          {toast}
        </div>
      )}

      {isSettingsOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-[2rem] w-full max-w-sm p-6 shadow-2xl relative animate-in zoom-in-95">
            <button
              onClick={() => setIsSettingsOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={20} />
            </button>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-500 rounded-xl flex items-center justify-center">
                <BellRing size={20} />
              </div>
              <h2 className="text-xl font-serif text-slate-800">Reminders</h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-2">
                  How often would you like to be reminded?
                </label>
                <div className="space-y-2">
                  {['never', 'daily', 'weekly', 'monthly', 'seasonally'].map(
                    (freq) => (
                      <label
                        key={freq}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                          notifyFreq === freq
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-slate-200 hover:border-indigo-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="notifyFreq"
                          value={freq}
                          checked={notifyFreq === freq}
                          onChange={(e) => setNotifyFreq(e.target.value)}
                          className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="capitalize font-medium text-slate-700 text-sm">
                          {freq === 'never'
                            ? 'Never'
                            : freq === 'seasonally'
                            ? 'Seasonally (Before events)'
                            : freq}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </div>

              <button
                onClick={handleTestNotification}
                className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Bell size={16} /> Test Notification
              </button>
            </div>
          </div>
        </div>
      )}

      {personToDelete && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-[2rem] w-full max-w-sm p-6 shadow-2xl relative animate-in zoom-in-95 text-center">
            <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={24} />
            </div>
            <h2 className="text-xl font-serif text-slate-800 mb-2">
              Remove {personToDelete.name}?
            </h2>
            <p className="text-slate-500 text-sm mb-6">
              Are you sure you want to stop tracking moments with{' '}
              {personToDelete.name}? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setPersonToDelete(null)}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors text-sm"
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {editFormData && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-[2rem] w-full max-w-md p-6 shadow-2xl relative animate-in zoom-in-95">
            <button
              onClick={() => setEditFormData(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-serif text-slate-800 mb-5 flex items-center gap-2">
              <Pencil size={20} className="text-indigo-500" /> Edit Profile
            </h2>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1 ml-1">
                  Name
                </label>
                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, name: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition-all text-sm"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1 ml-1">
                    Relationship
                  </label>
                  <select
                    value={editFormData.type}
                    onChange={handleEditTypeChange}
                    className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition-all text-slate-700 text-sm"
                  >
                    {LOVED_ONE_TYPES.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1 ml-1">
                    Countdown Age
                  </label>
                  <input
                    type="number"
                    value={editFormData.targetAge}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        targetAge: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition-all text-slate-700 text-sm"
                    min="1"
                    max="120"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1 ml-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={editFormData.dob}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, dob: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition-all text-slate-700 text-sm"
                  required
                />
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-all shadow-md shadow-indigo-200 flex justify-center items-center gap-2 text-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

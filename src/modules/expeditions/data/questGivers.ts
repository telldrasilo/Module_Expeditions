import type { QuestGiver } from '../types'

export const QUEST_GIVERS: QuestGiver[] = [
  {
    id: 'merchant_aldric',
    name: 'Альдрик',
    role: 'merchant',
    preferredBiomes: ['forest', 'mountains'],
    description:
      'Торговец пушниной и редкими травами. Часто нанимает искателей для проводки караванов.',
  },
  {
    id: 'alchemist_vrena',
    name: 'Врена',
    role: 'alchemist',
    preferredBiomes: ['swamp', 'forest'],
    description:
      'Мастер-алхимик из болотных краёв. Ищет редкие образцы спор и ядов для своих зелий.',
  },
  {
    id: 'blacksmith_garin',
    name: 'Гарин',
    role: 'blacksmith',
    preferredBiomes: ['mountains', 'deep_mines'],
    description:
      'Старый рудознатец и кузнец. Знает шахты лучше любого проходчика.',
  },
  {
    id: 'noble_ksenia',
    name: 'Ксения',
    role: 'noble',
    preferredBiomes: ['ancient_ruins', 'mountains'],
    description:
      'Баронесса из обедневшего рода. Раскопки руин — её последняя надежда на возрождение.',
  },
  {
    id: 'commoner_drav',
    name: 'Драв',
    role: 'commoner',
    preferredBiomes: ['forest', 'swamp', 'volcanic'],
    description:
      'Бывший солдат, ставший деревенским старостой. Простой народ обращается к нему за помощью.',
  },
  {
    id: 'merchant_olena',
    name: 'Олена',
    role: 'merchant',
    preferredBiomes: ['volcanic', 'deep_mines'],
    description:
      'Торговка редкими минералами и огнеупорными составами. Поставщик кузнечных мастеров.',
  },
]

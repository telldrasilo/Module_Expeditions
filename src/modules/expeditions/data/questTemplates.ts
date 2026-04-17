import type { QuestTemplate } from '../types'

/**
 * Quest templates — mission types with narrative templates.
 *
 * Each type defines:
 * - titleTemplate: short title with placeholders
 * - descriptionTemplate: full narrative description
 * - baseReward: gold and reputation
 * - requiredDataType: what data the quest needs (enemy/resource/none)
 *
 * Placeholders: {enemy}, {location}, {resource}, {questGiver}
 */

export const QUEST_TEMPLATES: QuestTemplate[] = [
  // ── HUNT — kill a specific creature ──────────────────────────────────
  {
    id: 'hunt',
    type: 'hunt',
    titleTemplate: 'Охота на {enemy} в {location}',
    descriptionTemplate:
      '{questGiver} просит уничтожить {enemy}, терроризирующего окрестности {location}. Путь туда небезопасен — местные стихии враждебны, а добыча хитра. Возьмите лучшее оружие и не задерживайтесь.',
    baseReward: { gold: 30, reputation: 10 },
    requiredDataType: 'enemy',
  },

  // ── GATHER — collect a specific resource ─────────────────────────────
  {
    id: 'gather',
    type: 'gather',
    titleTemplate: 'Сбор {resource} в {location}',
    descriptionTemplate:
      '{questGiver} остро нуждается в {resource}, который растёт только в {location}. Дорога туда небезопасна — твари и стихии не дремлют, — но награда стоит риска. Соберите и возвращайтесь.',
    baseReward: { gold: 20, reputation: 5 },
    requiredDataType: 'resource',
  },

  // ── EXPLORE — scout a location ───────────────────────────────────────
  {
    id: 'explore',
    type: 'explore',
    titleTemplate: 'Разведка: {location}',
    descriptionTemplate:
      '{questGiver} хочет получить подробный отчёт о {location}. Осмотрите территорию, отметьте опасности, оцените ресурсы и вернитесь с донесением. Бой — не цель, но не избегайте его, если выхода нет.',
    baseReward: { gold: 15, reputation: 15 },
    requiredDataType: 'none',
  },

  // ── DELIVER — transport cargo ────────────────────────────────────────
  {
    id: 'deliver',
    type: 'deliver',
    titleTemplate: 'Доставка в {location}',
    descriptionTemplate:
      '{questGiver} поручает доставить ценный груз в {location}. Дорога опасна — разбойники, твари и стихии подстерегают на каждом шагу. Защитите груз любой ценой и передайте из рук в руки.',
    baseReward: { gold: 25, reputation: 8 },
    requiredDataType: 'none',
  },

  // ── BOSS — defeat a powerful enemy ───────────────────────────────────
  {
    id: 'boss',
    type: 'boss',
    titleTemplate: 'Угроза: {enemy} в {location}',
    descriptionTemplate:
      'Могущественный {enemy} обосновался в {location}. {questGiver} обещает щедрую награду тому, кто избавит округу от этой напасти. Не недооценивайте противника — подготовьте оружие и не медлите.',
    baseReward: { gold: 60, reputation: 30 },
    requiredDataType: 'enemy',
  },

  // ── ESCORT — protect an NPC ──────────────────────────────────────────
  {
    id: 'escort',
    type: 'escort',
    titleTemplate: 'Сопровождение в {location}',
    descriptionTemplate:
      '{questGiver} просит сопроводить караван через {location}. Путь неблизкий, а груз ценный — каждый разбойник и тварь в округе будет чуять добычу. Доставьте караван в целости.',
    baseReward: { gold: 35, reputation: 12 },
    requiredDataType: 'none',
  },

  // ── CLEAR — purge enemies from area ──────────────────────────────────
  {
    id: 'clear',
    type: 'clear',
    titleTemplate: 'Зачистка: {location}',
    descriptionTemplate:
      '{questGiver} приказал зачистить {location} от враждебных тварей. Задание простое: идите, бейте, возвращайтесь. Но в этих местах простое быстро становится смертельным.',
    baseReward: { gold: 40, reputation: 15 },
    requiredDataType: 'none',
  },

  // ── RESCUE — save a missing person ───────────────────────────────────
  {
    id: 'rescue',
    type: 'rescue',
    titleTemplate: 'Спасение в {location}',
    descriptionTemplate:
      '{questGiver} сообщает: один из искателей не вернулся из {location}. Последний сигнал был три дня назад. Найдите его — живого или мёртвого — и возвращайтесь. Время имеет значение.',
    baseReward: { gold: 30, reputation: 20 },
    requiredDataType: 'none',
  },
]

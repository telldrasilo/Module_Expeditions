# 1. Introduction & high-level concept

## 1.1 Purpose of this document

This document describes the architecture and content of the **expeditions system** (locations, biomes, quests, and random events) for the idle blacksmith game. It is aimed at developers and contains mechanics, data structures, examples, and an implementation plan.

## 1.2 Core game concept

The player is a **blacksmith** who owns a workshop in a medieval fantasy world. The blacksmith does not travel personally; they work with the **Seekers’ Guild** — an organization that carries out dangerous jobs: gathering resources, scouting, and clearing territory.

**Key features:**

- **Idle loop:** the player picks a job on the board, supplies weapons (and possibly consumables), and sends an NPC seeker on a mission. Progress runs in real time (timers from about one hour to several hours).
- **Text-driven narrative:** during a mission, random events appear in a log under the timeline. Events affect loot, seeker condition, and weapons.
- **Elemental scars:** when weapons clash with elements (in combat or the environment), they gain hidden “scars.” After returning, the blacksmith can inspect damage and later awaken the weapon’s **War Soul**, turning scars into useful enchantments.
- **Semi-procedural content:** jobs and events are assembled from predefined templates and entities tied to biomes, tiers, and elements, giving variety without breaking world coherence.

## 1.3 Major system modules

- **Biomes & locations:** 12 biomes from the `RESOURCE_DEPOT` catalog, each with locations spread across **5 difficulty tiers**.
- **Elements:** 13 elements affecting weapon properties and the environment.
- **Quests:** generated from templates bound to biome, tier, client, enemies, and resources.
- **Random events:** occur during an expedition; categories include enemies, environmental anomalies, ruins, NPCs, and puzzles, with multiple possible outcomes.

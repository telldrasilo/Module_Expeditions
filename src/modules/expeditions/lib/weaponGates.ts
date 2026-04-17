import type { ExpeditionLocation, ExpeditionWeaponSnapshot } from '../types'

/** Whether the weapon's War Soul tier meets the location's minimum (when set). */
export function weaponMeetsLocationRequirement(
  weapon: ExpeditionWeaponSnapshot,
  location: ExpeditionLocation | undefined
): boolean {
  const req = location?.requiredItemTier
  if (req === undefined) return true
  return weapon.warSoulTier >= req
}

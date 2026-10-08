export const carBrands = {
  toyota: ['Camry', 'Corolla', 'Land-Cruiser'],
  lexus: ['Es', 'Lx', 'Is'],
  bmw: ['M2', 'series-3', 'M5'],
 
};

export type CarBrand = keyof typeof carBrands;
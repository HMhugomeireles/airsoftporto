import { type ClassValue, clsx } from "clsx";
import { randomBytes } from 'crypto';
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from 'uuid';

export function randomUuid() {
  return uuidv4();
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatName(fullName: string) {
  const nameSplit = fullName.split(" ");
  return `${nameSplit.at(0)?.charAt(0)}${nameSplit.at(nameSplit.length - 1)?.charAt(0)}`;
}

export function formatFirstName(fullName: string) {
  return fullName.split(' ').at(0)
}

export function formatLastName(fullName: string) {
  const nameSplit = fullName.split(" ");
  return nameSplit.at(nameSplit.length - 1);
}

export function getWordFirstLatter(word: string) {
  if (!word) {
    return ''
  }
  return word.charAt(0);
}

export function validateNIF(nif: string): boolean { 
  if (!['1', '2', '3', '5', '6', '8'].includes(nif.substr(0, 1)) && 
    !['45', '70', '71', '72', '77', '79', '90', '91', '98', '99'].includes(nif.substr(0, 2))) {
    return false;
  } 
  const total = Number(nif[0]) * 9 + Number(nif[1]) * 8 + Number(nif[2]) * 7 + Number(nif[3]) * 6 + Number(nif[4]) * 5 + Number(nif[5]) * 4 + Number(nif[6]) * 3 + Number(nif[7]) * 2;
  const modulo11 = total - Math.trunc(total / 11) * 11;
  const comparator = modulo11 === 1 || modulo11 === 0 ? 0 : 11 - modulo11;
  
  return Number(nif[8]) === comparator; 
}

export function getBaseURl() {
  return process.env.NODE_ENV === "production" ? `${process.env.NEXT_PUBLIC_BASE_URL}` : `http://localhost:3000`
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('pt-PT', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export function generateToken() {
  return randomBytes(10).toString('hex');
}

export function handleNullStringValue(value: unknown) {
  return value === null ? '' : value
}
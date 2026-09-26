import { db } from "../firebase";
import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

const DEFAULT_SETTINGS = {
  maxTransaction: 2000,
  dailyLimit: 5000,
  approvalLimit: 1000,
  categories: {
    Shopping: true,
    Travel: true,
    Food: false,
    Entertainment: false,
  },
  security: {
    lateNight: true,
    highValueOTP: true,
    blockedAlert: true,
  },
};

export async function getWalletSettings(uid) {
  const ref = doc(db, "wallet_settings", uid);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    return snap.data();
  }

  await setDoc(ref, DEFAULT_SETTINGS);
  return DEFAULT_SETTINGS;
}

export async function saveWalletSettings(uid, data) {
  const ref = doc(db, "wallet_settings", uid);

  await setDoc(ref, data, {
    merge: true,
  });
}
export interface NoBioRemarksModel {
  id: number;
  attendanceId: number; // keeping your property name as-is (typo preserved if backend sends it like this)
  remarks: string;
}
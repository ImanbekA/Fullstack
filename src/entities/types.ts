export interface User {
  id: number;
  email: string;
  nickname: string;
  phone: string;
  registrationDate: string;
}

export interface Photo {
  id: number;
  assessmentId: number;
  url: string;
}

export enum DamageType {
  Scratch = "scratch",
  Dent = "dent",
  Crack = "crack",
  Rust = "rust",
  Broken = "broken",
}

export enum BodyPart {
  Hood = "hood",
  FrontBumper = "front_bumper",
  Roof = "roof",
  Trunk = "trunk",
  RearBumper = "rear_bumper",
  FrontLeftDoor = "front_left_door",
  FrontRightDoor = "front_right_door",
  RearLeftDoor = "rear_left_door",
  RearRightDoor = "rear_right_door",
}

export enum Severity {
  Minor = "minor",
  Moderate = "moderate",
  Severe = "severe",
}

export enum AssessmentStatus {
  Draft = "draft",
  Analyzing = "analyzing",
  Completed = "completed",
  Failed = "failed",
}

export interface Damage {
  id: number;
  assessmentId: number;
  photoId: number;
  type: DamageType;
  bodyPart: BodyPart;
  severity: Severity;
  estimatedCost: number;
}

export interface Assessment {
  id: number;
  userId: number;
  brand: string;
  model: string;
  year: number;
  photos: Photo[];
  damages: Damage[];
  cost: number;
  assessmentDate: string;
  status: AssessmentStatus;
  confirmed: boolean;
}
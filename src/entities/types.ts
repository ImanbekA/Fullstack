export interface User {
    id: number;
    email: string;
    nickname: string;
    phone: string;
    RegistrationDate: string;
}

export interface Photo {
    id: number;
    AssessmentId: number;
    url: string;
}

export enum DamageType {
    Scratch = "scratch", //царапина
    Dent = "dent", //вмятина
    Crack = "crack", //трещина
    Rust = "rust", //ржавчина
    Broken = "broken" //Сломанная деталь 
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
    RearRightDoor = "rear_right_door"
}

export enum Severity {
    Minor = "minor",
    Moderate = "moderate",
    Severe = "severe"   
}

export enum AssessmentStatus {
    Draft = "draft",
    Analyzing = "analyzing",
    Completed = "completed",
    Failed = "failed"
}

export interface Assessment { //оценка (в 1 оценке может быть несколько повреждений)
    id: number;
    userId: number;
    brand: string;
    model: string;
    year: number;
    photos: Photo[];
    damages: Damage[];
    cost: number;
    AssessmentDate: string;
    status: AssessmentStatus;
    confirmed: boolean;
}

export interface Damage { //повреждения 
    id: number;
    assessmentId: number;
    photoId: number;
    type: DamageType;
    bodyPart: BodyPart;
    severity: Severity;
    estimatedCost: number;
}

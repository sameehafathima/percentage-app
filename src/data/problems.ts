export interface Problem {
  id: string;
  part: number;
  whole: number;
  text: string;
  targetPercent: number;
}

export interface AggregatorProblem {
  id: string;
  tanks: { part: number; whole: number; label: string }[];
  text: string;
  targetPercent: number;
}

export const level1Problems: Problem[] = [
  { id: '1-1', part: 35, whole: 100, text: 'Grow 35% of your garden', targetPercent: 35 },
  { id: '1-2', part: 25, whole: 50, text: 'Plant 25 seeds in a pot of 50. What is the percentage?', targetPercent: 50 },
  { id: '1-3', part: 10, whole: 100, text: 'Grow 10% of your garden', targetPercent: 10 },
  { id: '1-4', part: 40, whole: 50, text: 'Plant 40 seeds out of 50. What percent bloomed?', targetPercent: 80 }
];

export const level2Problems: Problem[] = [
  { id: '2-1', part: 36, whole: 60, text: 'Maya scored 36 out of 60 on her quiz. Show that as a percentage.', targetPercent: 60 },
  { id: '2-2', part: 42, whole: 70, text: 'A tree grew 42 leaves out of a possible 70. What is the percentage?', targetPercent: 60 },
  { id: '2-3', part: 72, whole: 90, text: 'It rained 72 days out of 90. What percent of days were rainy?', targetPercent: 80 },
  { id: '2-4', part: 15, whole: 20, text: 'You found 15 out of 20 hidden seeds. What percentage is that?', targetPercent: 75 }
];

export const level3Problems: AggregatorProblem[] = [
  {
    id: '3-1',
    tanks: [
      { part: 25, whole: 40, label: 'English' },
      { part: 35, whole: 60, label: 'Social Studies' }
    ],
    text: 'Combine the scores to find the total percentage.',
    targetPercent: 60
  },
  {
    id: '3-2',
    tanks: [
      { part: 10, whole: 20, label: 'Math' },
      { part: 40, whole: 80, label: 'Science' }
    ],
    text: 'What is the combined percentage of both tests?',
    targetPercent: 50
  }
];

import Track from 'app/contracts/track';
import Status from 'app/contracts/status';
import QuestionType from 'app/contracts/question_type';
import Answer from 'app/contracts/answer';

export interface Question {
  id?: number;
  type: QuestionType;
  title: string;
  description?: string;
  answers: Answer[];
  answered?: boolean;
  track: Track;
  status: Status;
}

export default Question;

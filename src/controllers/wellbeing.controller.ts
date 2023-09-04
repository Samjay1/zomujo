import { Request, Response } from "express";
import { QueryFailedError } from "typeorm";
import { z } from "zod";
import { TestResult, testType } from "../models/testResults";
import { dataSource } from "../data-source";
import { User } from "../models/user";
const lifeSatisfactionStatements: string[] = [
  "In most ways, my life is close to my ideal.",
  "The conditions of my life are excellent.",
  "I am satisfied with my life.",
  "So far, I have gotten the important things I want in life.",
  "If I could live my life over, I would change almost nothing.",
];
const depressionAssessmentStatements: string[] = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it's hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid, as if something awful might happen",
];
const anxietyAssessmentStatements: string[] = [
  "I was bothered by things that usually don't bother me.",
  "I did not feel like eating; my appetite was poor.",
  "I felt that I could not shake off the blues even with help from my family or friends.",
  "I felt that I was just as good as other people.",
  "I had trouble keeping my mind on what I was doing.",
  "I felt depressed.",
  "I felt that everything I did was an effort.",
  "I felt hopeful about the future.",
  "I thought my life had been a failure.",
  "I felt fearful.",
];

const behavioralActivationQuestions: string[] = [
  "I have carried out activities that require quite a bit of energy and effort.",
  "I have participated in activities that I normally enjoy.",
  "I have been doing things to get myself started, even when I didn't feel like it.",
  "I have been spending time with other people.",
  "I have been setting myself goals for things to do each day.",
  "I have been actively working to make my situation better.",
  "I have been doing things to get my mind off my problems.",
  "I have been taking part in activities that used to be fun or gave me satisfaction.",
  "I have been doing things I would rather not do because they needed doing.",
];

const EPDSquestions: string[] = [
  "I have been able to laugh and see the funny side of things.",
  "I have looked forward with enjoyment to things.",
  "I have blamed myself unnecessarily when things went wrong.",
  "I have been anxious or worried for no good reason.",
  "I have felt scared or panicky for no good reason.",
  "Things have been getting on top of me.",
  "I have been so unhappy that I have had difficulty sleeping.",
  "I have felt sad or miserable.",
  "I have been so unhappy that I have been crying.",
  "The thought of harming myself has occurred to me.",
];
const validator = z.object({
  type: z.nativeEnum(testType),
});


function calculateResults(answers: number[]): number {
  let sum: number = 0;

  answers.forEach((elem) => {
    sum += elem;
  });
  return sum;
}

async function generateInterpretation(type: testType, results: number) {
  try {
    validator.parse({
      type,
    });
    if (type == testType.GAD) {
      if (results >= 0 && results <= 4) {
        return "Minimal anxiety - It suggests that you are experiencing only mild levels of anxiety, and it may not significantly interfere with your daily life";
      } else if (results >= 5 && results <= 9) {
        return " Mild anxiety - This indicates mild anxiety symptoms. While it might not be severe, you may still find it affecting your well-being in certain aspects";
      } else if (results >= 10 && results <= 14) {
        return "Moderate anxiety - This suggests a moderate level of anxiety. At this point, you may notice more pronounced anxiety symptoms that could be impacting your daily life";
      } else if (results >= 15 && results <= 21) {
        return "Severe anxiety - A score in this range indicates severe anxiety symptoms. It is essential to seek support and help from a mental health professional to manage these symptoms effectively.";
      } else {
        throw new Error("Invalid response");
      }
    } else if (type == testType.SLS) {
      if (results >= 0 && results <= 4) {
        return "Extremely low life satisfaction - Scores in this range also indicate extremely low life satisfaction. If your score falls in this category, it may signal significant dissatisfaction with life, and seeking professional help or support could be beneficial in addressing and improving your overall well-being";
      } else if (results >= 5 && results <= 9) {
        return "Extremely low life satisfaction - A score in this range indicates very low life satisfaction. It may be essential to seek support and intervention to address the factors contributing to such dissatisfaction";
      } else if (results >= 10 && results <= 14) {
        return "Very low life satisfaction - This suggests a very low level of life satisfaction, and it may be impacting your overall well-being and happiness";
      } else if (results >= 15 && results <= 19) {
        return "Low life satisfaction - At this level, life satisfaction is still relatively low, and it may be beneficial to explore ways to improve your overall satisfaction with life";
      } else if (results >= 20 && results <= 24) {
        return "Moderate life satisfaction - This range indicates moderate life satisfaction, which suggests you are generally content with your life, but there is still room for improvement";
      } else if (results >= 25 && results <= 29) {
        return "High life satisfaction - A score in this range suggests high life satisfaction. You are likely content with your life and experience a good level of overall well-being";
      } else if (results >= 30 && results <= 35) {
        return "Extremely high life satisfaction - A score in this range indicates extremely high life satisfaction. Congratulations! You seem to be very content with your life and overall well-being";
      } else {
        throw new Error("Invalid response");
      }
    } else if (type == testType.BADS) {
      if (results >= 0 && results <= 10) {
        return "Very low behavioral activation - A score in this range indicates very low engagement in activities and a potential sign of significant depression. It may be essential to seek professional help to address and overcome the barriers to engaging in rewarding activities.";
      } else if (results >= 11 && results <= 20) {
        return "Low behavioral activation - This suggests a low level of engagement in activities, which might be affecting your mood and well-being. Consider exploring strategies to increase your participation in rewarding and meaningful activities";
      } else if (results >= 21 && results <= 30) {
        return "Moderate behavioral activation - At this level, you are moderately engaged in activities, but there is room for improvement. Focusing on increasing behavioral activation may have a positive impact on your mood and motivation";
      } else if (results >= 31 && results <= 40) {
        return "High behavioral activation - A score in this range indicates a relatively high level of engagement in activities, which is likely to be beneficial for your overall well-being and may act as a protective factor against depression";
      } else if (results >= 41 && results <= 45) {
        return "Very high behavioral activation - Scores in this range suggest very high engagement in activities and a strong likelihood of experiencing positive emotions and a reduced risk of depression";
      } else {
        throw new Error("Invalid response");
      }
    } else if (type == testType.CES) {
      if (results >= 0 && results <= 9) {
        return "Minimal or no depressive symptoms - A score in this range indicates that you are experiencing minimal or no depressive symptoms based on the CES-D-10";
      } else if (results >= 10 && results <= 14) {
        return "Mild depressive symptoms - This suggests mild levels of depressive symptoms. While it may not indicate a clinical diagnosis of depression, you may want to keep an eye on your mood and consider seeking support if these symptoms persist or worsen";
      } else if (results >= 15 && results <= 21) {
        return "Moderate behavioral activation - At this level, you are moderately engaged in activities, but there is room for improvement. Focusing on increasing behavioral activation may have a positive impact on your mood and motivation";
      } else if (results >= 22 && results <= 30) {
        return " Severe depressive symptoms - A score in this range suggests severe levels of depressive symptoms. It is crucial to seek professional help and support to address these symptoms effectivel";
      } else {
        throw new Error("Invalid response");
      }
    } else if (type == testType.EPDS) {
      if (results >= 0 && results <= 9) {
        return "Normal range - A score in this range suggests that you are within the normal range of mood and well-being for a new mother";
      } else if (results >= 10 && results <= 12) {
        return "Mild depression - This indicates mild depressive symptoms. It's essential to monitor your feelings and consider seeking support if these symptoms persist or worsen";
      } else if (results >= 13 && results <= 15) {
        return "Moderate depression - Scores in this range suggest moderate levels of depressive symptoms. It is recommended to discuss your feelings with a healthcare professional to determine appropriate support or treatment options";
      } else if (results >= 16 && results <= 30) {
        return "Severe depression - A score in this range indicates severe levels of depressive symptoms. It is crucial to seek professional help and support from a mental health specialist to address these symptoms effectively";
      } else {
        throw new Error("Invalid response");
      }
    }
  } catch (error: any) {
    throw new Error(error);
  }
}
export async function getQuestions(req: Request, res: Response) {
  try {
    const type = req.params["type"];

    if (type == "") {
      return res.status(400).send("Pass type");
    }
    validator.parse({
      type,
    });

    res
      .status(200)
      .send(
        type == testType.SLS
          ? lifeSatisfactionStatements
          : type == testType.GAD
          ? depressionAssessmentStatements
          : type == testType.BADS
          ? behavioralActivationQuestions
          : type == testType.CES
          ? anxietyAssessmentStatements
          : type == testType.EPDS && EPDSquestions
      );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).send(error);
    }
    res.status(500).send(error);
  }
}

export async function getResults(req: Request, res: Response) {
  try {
    interface IResponse {
      question: string;
      answer: number;
    }
    const { type, response, id } = req.body;
    validator.parse({
      type
    })
    if(!response || !id){
      return res.status(400).send("BR")
    }
    const answers: number[] = response.map((elem: IResponse) => {
      return elem.answer;
    });

    const user = dataSource.manager.findOne(User, {
      where: {
        id: id as string,
      },
    });
    if (!user) {
      return res.status(400).send("User does not exist");
    }

    const results = calculateResults(answers);
    const interpretation = await generateInterpretation(type, results);

    const testResult = new TestResult();
    testResult.results = {
      number: results,
      interpretation: interpretation as string,
    };
    testResult.user = id;
    testResult.testType = type;
    testResult.response = response;

    const createdTestResults = await dataSource
      .getRepository(TestResult)
      .save(testResult);

    res.status(201).send(createdTestResults);
  } catch (error) {
    
    if (error instanceof z.ZodError) {
      return res.status(400).send("Bad request");
    }
    if( error instanceof QueryFailedError){
      return res.status(500).send(error.message)
    }
    res.status(500).send(error);
  }
}

export async function getUserTestHistory(req: Request, res: Response){
  try {
    const id = req.query['id']
    if(!id){
      return res.status(400).send('Pass id')
    }
    
    const user = await dataSource.manager.findOne(User, {
      where:{
        id: id as string
      },
      relations: {
        results: true
      }
    })

    if(!user){
      return res.status(404).send('User not found.')
    }
    
    res.status(200).send(user.results)
  } catch (error) {
    
    if (error instanceof z.ZodError) {
      return res.status(400).send("Bad request");
    }
    if( error instanceof QueryFailedError){
      return res.status(500).send(error.message)
    }
    res.status(500).send(error);
  }
}

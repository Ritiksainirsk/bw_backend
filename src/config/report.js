class ReportConfig {
  
    static calculateRange = async (score, object) => {

    }

    static calculateSubjectSelectorRange = async (stream) => {
        let short_description  = "";
        let range = 0;
        range = this.calculateRange(Math.round((stream['aptitude'] * 100 )/10,2),31 ,70 );
        short_description += ReportConfig.SubjectSelectorShortDescription[stream["title"]]["aptitude"][range];
        range = this.calculateRange(Math.round((stream['interest']*100 ) / 27,2),31 ,70 );
        short_description += ReportConfig.SubjectSelectorShortDescription[stream["title"]]["interest"][range];
        
        return short_description;
    }

    static calculateRange = (score, range1, range2) =>{
        if(score >= range2){
            return "high";
        }else if(score > range1 && score <= range2 ){
            return "medium";
        }else if(score < range1){
            return "low";
        }
    }

    static SubjectSelectorShortDescription = {
        "Science (Maths)" : {
            "aptitude" : {
                "high" : "Engage in a substantial amount of logical and numerical problem-solving and puzzle-solving to excel in the subject.",
                "low" : "Investing additional hours in the subject could be advantageous. It is advisable to delve deeper into the subject's scope to mitigate the potential influence of the attitudes and preconceived notions held by significant individuals.",
                "medium" : "This pattern defines the potential for numerical and technical skills, which can be honed through consistent practice and determination."
            },
            "interest" : {
                "high" : "You'll find it relatively easy to invest extra hours in related subjects due to your strong interest.",
                "low" : "The profile indicates a favorable level of motivation and self-efficacy in the subject. To sustain this motivation, it is advisable to capitalize on your strengths and put in dedicated effort.",
                "medium" : "The profile indicates a high level of motivation and self-efficacy in the subject. To maintain this motivation, it is recommended to leverage your strengths and put in hard work."
            }
        },
        "Commerce" : {
            "aptitude" : {
                "high" : "High aptitude is a reflection of the swiftness and precision with which work is accomplished.",
                "low" : "Devoting extra time to the subject can yield benefits. It is advisable to conduct a more comprehensive exploration of the subject's potential, ensuring that external influences such as the attitudes and preconceptions of significant others do not hinder progress.",
                "medium" : "The pattern reflects a moderate proficiency in languages and communication."
            },
            "interest" : {
                "high" : "Interest plays a significant role in the natural absorption of information.",
                "low" : "Investing additional time in the subject can be advantageous. It is suggested to delve deeper into the subject's scope to mitigate the potential influence of the attitudes and preconceived notions held by significant individuals.",
                "medium" : "Participating in team activities and learning to be a team player can facilitate progress from an average level to excellence."
            }
        },
        "Humanities" : {
            "aptitude" : {
                "high" : "High aptitude is a reflection of the swiftness and precision with which work is accomplished.",
                "low" : "Allocating more time to the subject could be beneficial. It is advisable to engage in a more thorough exploration of the subject's potential, safeguarding against the impact of external influences like the attitudes and preconceived notions of significant individuals.",
                "medium" : "Their strengths in the subject fall within the average range, leaving room for improvement. Focusing more intently can lead to becoming a highly proficient expert in the field."
            },
            "interest" : {
                "high" : "A strong interest profile provides ample room for enhancing your moderate aptitude for observation and analysis. With additional effort and patience, you can achieve remarkable results.",
                "low" : "The assessment indicates a healthy level of motivation and self-efficacy in the subject. To maintain this motivation, it is recommended to leverage your strengths and put in diligent effort.",
                "medium" : "The profile shows a good level of motivation and self-efficacy in the subject. To sustain high motivation, it is advised to build upon your strengths and put in dedicated effort."
            }
        },
        "Science (Bio)" : {
            "aptitude" : {
                "high" : "Engage in a substantial amount of logical and numerical problem-solving and puzzle-solving to excel in the subject.",
                "low" : "Devoting extra time to the subject can lead to positive outcomes. It is advisable to conduct a more comprehensive exploration of the subject's potential, ensuring that external influences, such as the attitudes and preconceptions of significant individuals, do not impede progress.",
                "medium" : "Their proficiency in the subject is within the middle range, offering room for enhancement. Concentrated effort would elevate them to become an adept professional in the field."
            },
            "interest" : {
                "high" : "A strong interest profile provides ample room for enhancing your moderate aptitude for observation and analysis. With additional effort and patience, you can achieve remarkable results.",
                "low" : "Investing additional time in the subject can be advantageous. It is suggested to delve deeper into the subject's scope to mitigate the potential influence of the attitudes and preconceived notions held by significant individuals.",
                "medium" : "The profile indicates a commendable level of motivation and self-assurance in the subject. To sustain a high level of motivation, it is recommended to harness their strengths and engage in diligent work."
            }
        }
    };

    static IdealCareerTest = {
       
    };
    
}
  
module.exports = ReportConfig;
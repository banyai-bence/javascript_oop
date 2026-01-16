class Student{
    constructor(name){
        this.name=name
        this.askedQuestionNumber=0
    }

    askedQuestion(){
        console.log('???')
        this.askedQuestionNumber++
    }
}

const stu1= new Student('Bence')
console.log(stu1)

stu1.askedQuestion()
console.log(stu1)

class StudentWithWork extends Student{
    constructor(name){
        super(name)
        this.workDone=0
    }
    doWork(){
        this.workDone++
    }
}

const stu2=new StudentWithWork('Bányai')

stu2.doWork()
stu2.askedQuestion()
console.log(stu2)


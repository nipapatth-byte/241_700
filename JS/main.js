/*
//String - ตัวอักษร
let fname = 'John'
console.log('name',fname)
const idcard = '123' //const ค่าคงที่เปลี่ยนแปลงค่าไม่ได้

//number - ตัวเลข
let age = 30
let height = 150.5
const pi = 3.14
fname = 'Tom'

idcard = '456'
console.log('idcard',idcard)

console.log('name',fname,'age',age)
//console.log('age',age)
*/
/**
+ บวก
- ลบ
* คูณ
/ หาร
% mod หารเอาเศษ

condition statement (if,else,switch)
    == เท่ากับ,!= ไม่เท่ากับ , > มากกว่า ,>=มากกว่าเท่ากับ
    < น้อยกว่า ,<= น้อยกว่าเท่ากับ

let number1 = 5
let number2 = 3

let condition1 = number1 <= number2 //Boolean (true,false)

console.log('condition is = ',condition1)

let number1 = 5
let number2 = 5
//if - else condition
if (number1 != number2) {
    console.log('this if')
} else if (number1 == number2) {
    console.log('this else if')
}else {
    console.log('this else')
}

Grade
>= 80 A
>= 70 B
>= 60 C
>= 50 D

//let score = prompt('ใส่ตัวเลข')
let score = 55
if (score >= 80) { //F
    console.log('Grade : A')
} else if(score >= 70) {  //F
    console.log('Grade : B')
} else if (score >= 60) { //F
    console.log('Grade : C')
} else if (score >= 50) { //T
    console.log('Grade : D')
} else { //F
    console.log('Grade : F')
}  */

/**
    && และ , || หรือ , ! not ไม่

let number1 = 5
let number2 = 10

//T = T && T , F = T && F
//T = T || F , F = F || F
let condition = number1 >= 3 && number2 >= 11
console.log('result of condition',condition)

let number = 20
if(number % 2 == 0){
    console.log('you are event.')
}*/

/*
for

let counter = 0
while (counter < 10){
    console.log('Hi')
    counter += 1
}

for(let counter = 0; counter < 10;counter++) {
    console.log('Hi')
}
*/

/*
array

let age1 = 20
let age2 = 25
let age3 = 30

let ages = [20,25,30]
//แทนที่
ages = [200,100,50]
console.log('age1 age 2 age3',age1,age2,age3)
console.log(`age1 age 2 age3 ${age1} ${age2} ${age3}`)
console.log('array',ages)

//ต่อ array
ages.push(25)
console.log('push array',ages)

//ลบ array ตัวสุดท้าย
ages.pop()
console.log('pop array',ages)

let ages = [50,20,25,30,35,40]

if (ages.includes(30)) {
    console.log('มีเลข30 อยู่ในarray')
}

ages.sort()
console.log(ages)

let name_list = ['aa','bb','cc']
name_list.push('dd')
console.log(name_list)

name_list.pop()
console.log('pop name_list',name_list)
console.log('name_list',name_list.length)

for (let index = 0; index < name_list.length; index++){
    console.log('name_list',name_list[index])
}
*/

/**
object

let student = [{
    age : 30,
    name : 'aa',
    garde : 'A'
},{
    age : 35,
    name : 'bb',
    garde : 'B'
}]
student.push({
    age : 40,
    name : 'cc',
    garde : 'C'
})

student.pop()

for (let index = 0; index < student.length;index++) {
    console.log('Student Number', (index + 1))
    console.log('age',student[index].age)
    console.log('name',student[index].name)
    console.log('grade',student[index].garde)
}*/

/*
function


let score1 = 55
let score = 65

let garde =''
function calculat_grade(score1) {
if (score >= 80) { 
    grade = 'A'
} else if(score >= 70) { 
    grade = 'B'
} else if (score >= 60) {
    grade = 'C'
} else if (score >= 50) {
    grade = 'D'
} else {
    grade = 'F'
}
return garde
}

//เรียกใช้ฟังชัน
let grade1 =calculat_grade(score1)
console.log('Grade',grade1)
*/

/*
let score = [20,30,40,50]

for (let index = 0; index < score.length; index++) {
    console.log('score',score[index])
    /if (score[index] >= 30){
        newScore.push(score[index])
    }/
}

score = score.map ((s) => {
    return s * 2
})

let newScore = score.filter((s) => {
    return s >= 30
})

newScore.forEach((ns) => { 
    console.log('New Score',ns)
})
*/

/*
Object function
*/

let students = [{
    name : 'aa',
    score : 50,
    geade : 'D'
},{
    name : 'bb',
    score : 80,
    geade : 'A'
}]

let student = students.find((s) => {
    if (s.name == 'aa'){
        return true
    }
})

let double_score = students.map((s) => {
    s.score = s.score * 2
    return s
})

let hightScore = students.filter((s) => {
    if (s.score >= 120){
        return true
    }
})
console.log(student)

console.log('double_score',double_score)
console.log('highScore',hightScore)
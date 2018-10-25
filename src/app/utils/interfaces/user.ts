export interface UserObj {
    info: {
        firstName: string,
        lastName: string,
        phoneNumber: string,
        address: string,
        email: string,
        city: string,
        state: string,
    }
}

    // medical: [
    //   { complete: false },
    //   {
    //     questions: [
    //       { 'Do you smoke?': true },
    //       { 'Do you excersise': true }
    //     ]
    //   }
    // ],
    // payments: [
    //   { membership: '3 moth plan', ammoun: '$155', purchased: 'July,10,2018', expires: 'Sep,10,2018' }
    // ],
    // questions: [
    //   {
    //     title: 'Question title', question: 'The question???', questionDate: 'June 13 2018',
    //     answer: 'The Answer', answerDate: '', responded: false,
    //   }
    // ],
    // appointments: [
    //   { sugery: 'Surgery Name', doctor: "Doctor's Name", specialty: 'Ortophedic', office: 'Location', date: 'DateScheduled' }
    // ]
const users = [
    {
        id: 1,
        name: 'Charles',
        schoolId: 101
    },
    {
        id: 2.22222,
        name: 'Fred',
        schoolId: 999
    }
];

// async async async

const getGrades = (schoolId) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter(grade => grade.schoolId === schoolId));
    });
}

const getStatusAlt = async (userId) => {
    const user = await getUser(userId);
    const grades = await getGrades(user.schoolId);

    let avg = 0;
    if (grades.length > 0) {
        avg = grades.map(grade => grade.grade).reduce((a, b) => a + b) / grades.length;
    } else {
        console.log('allo');
    }
    return `${user.name} has a ${avg}% avg in the class.`;
};

// getUser(2).then(user => {
//     console.log(user);
// }).catch(e => {
//     console.log(e)
// });

// getGrades(101).then(grades => {
//     console.log(grades);
// }).catch(e => {
//     console.log(e)
// });

// getStatus(1).then(status => {
//     console.log(status);
// });

/**
 * Mike wazow
 */
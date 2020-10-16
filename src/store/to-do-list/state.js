const state = {
    searchString: '',
    openTasksCurrentSortCode: 'CREATED_AT_ASC',
    doneTasksCurrentSortCode: 'DUE_DATE_ASC',
    taskSortOptions: {
        CREATED_AT_ASC: {
            label: 'Date creation (Asc)',
            comparator: (t1, t2) => (t1.createdDate > t2.createdDate ? 1 : -1)
        },
        CREATED_AT_DESC: {
            label: 'Date creation (Desc)',
            comparator: (t1, t2) => (t1.createdDate < t2.createdDate ? 1 : -1)
        },
        DUE_DATE_ASC: {
            label: 'Due date (Asc)',
            comparator: (t1, t2) => (t1.dueDate > t2.dueDate ? 1 : -1)
        },
        DUE_DATE_DESC: {
            label: 'Due date (Desc)',
            comparator: (t1, t2) => (t1.dueDate < t2.dueDate ? 1 : -1)
        },
        TEXT_ASC: {
            label: 'Text (Asc)',
            comparator: (t1, t2) => (t1.text > t2.text ? 1 : -1)
        },
        TEXT_DESC: {
            label: 'Text (Desc)',
            comparator: (t1, t2) => (t1.text < t2.text ? 1 : -1)
        }
    }
};

export default state;

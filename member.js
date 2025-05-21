function skillsMember() {
    return {
        name: 'skills',
        description: 'Skills and abilities of the member',
        type: 'array',
        items: {
            type: 'object',
            properties: {
                skill: {
                    type: 'string',
                    description: 'Name of the skill'
                },
                level: {
                    type: 'string',
                    description: 'Proficiency level of the skill'
                }
            },
            required: ['skill', 'level']
        }
    };
}
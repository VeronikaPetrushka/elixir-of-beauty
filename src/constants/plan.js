const plan = [
    {
        question: 'How does your skin look 2-3 hours after washing?',
        options: [
            {
                option: 'Dry, feels tight.',
                description: [
                    'Your skin is prone to tightness and peeling. It often needs additional hydration and nutrition.',
                    'Morning: Cleansing with cream products, tonic without alcohol, moisturizing with cream with hyaluronic acid, SPF 30+.',
                    'Evening: Cleansing with milk, moisturizing serum, night cream with oils.'
                ],
                recommendations: [
                    'Use moisturizing creams based on hyaluronic acid or oils.',
                    'Avoid aggressive cleaning agents.',
                    'Wash with warm, not hot, water.',
                    'Moisturizing masks 1-2 times a week, soft peeling.'
                ]
            },
            {
                option: 'Oily, shine appears.',
                description: [
                    'Your skin is often shiny and has enlarged pores. You may notice a tendency to acne',
                    'Morning: Cleansing with gel or foam, matting tonic, light gel-cream, SPF 30+.',
                    'Evening: Gel cleansing with salicylic acid, serum with antibacterial properties, night cream for oily skin.'
                ],
                recommendations: [
                    'Choose light wash gels that control sebum production.',
                    'Use non-comedogenic creams.',
                    'Do not avoid moisturizing - choose light gel textures.',
                    'Clay masks 1-2 times a week, peeling with salicylic acid.'
                ]
            },
            {
                option: 'Normal, no discomfort.',
                description: [
                    'You notice shine in the T-zone, while cheeks remain dry.',
                    'Morning: Light cleansing, aloe or rose tonic, gel-cream, SPF 30+.',
                    'Evening: Cleansing with milk for dry areas, gel for the T-zone, serum with hyaluronic acid, night cream for combination skin.'
                ],
                recommendations: [
                    'Use different products for the T-zone and dry areas.',
                    'Moisturizing should be light and not overload the skin.',
                    'Apply clay masks for the T-zone once a week.',
                    'Clay masks for the T-zone, moisturizing for the cheeks, peeling once a week.'
                ]
            },
            {
                option: 'Shiny in the T-zone, but dry on the cheeks.',
                description: [
                    'Your skin is balanced, without any particular problems.',
                    'Morning: Gentle cleansing, moisturizing toner, light moisturizer, SPF 30+.',
                    'Evening: Cleansing with milk or gel, serum with vitamin C, night cream with antioxidants.'
                ],
                recommendations: [
                    'Maintain balance with light hydration.',
                    'Protect your skin from UV rays.',
                    'Care can be minimized, but do not forget about regular cleaning.',
                    'Moisturizing masks once a week, light peeling once a week.'
                ]
            },
        ]
    },
    {
        question: 'How does your skin react to weather conditions (cold, wind, sun)?',
        options: [
            {
                option: 'Easily irritated, red.',
            },
            {
                option: 'Almost unresponsive, stable',
            },
            {
                option: 'It shines in summer, dries up in winter.',
            },
            {
                option: 'Dryness or flaking is often felt.',
            },
        ]
    },
    {
        question: 'How noticeable are your pores?',
        options: [
            {
                option: 'Almost invisible.',
            },
            {
                option: 'Very noticeable, extended.',
            },
            {
                option: 'Visible only in the T-zone.',
            },
            {
                option: 'I don`t know, they look normal.',
            },
        ]
    },
    {
        question: 'How often do you get breakouts or acne?',
        options: [
            {
                option: 'Rarely or almost never.',
            },
            {
                option: 'Often, especially on the forehead, nose, chin.',
            },
            {
                option: 'Sometimes, depending on care or nutrition.',
            },
            {
                option: 'Almost does not happen, but there is redness.',
            },
        ]
    },
    {
        question: 'How does your skin look after using the cream?',
        options: [
            {
                option: 'Quickly absorbed, moisturized.',
            },
            {
                option: 'It becomes greasy or shiny.',
            },
            {
                option: 'Comfortable in the T-zone, but dry on the cheeks.',
            },
            {
                option: 'Irritation or tightness is felt.',
            },
        ]
    }
];

export default plan;
export const listingsData = [
    // ── Japan ──
    {
      title: 'Shibuya Modern Apartment with City Views',
      description:
        'Sleek one-bedroom apartment on the 22nd floor of a modern Shibuya tower. Floor-to-ceiling windows frame the Shibuya crossing below. Minimal Muji-style interiors with a queen-size memory-foam bed, rain shower, Nespresso machine, and dedicated workspace. Five-minute walk to JR Shibuya station.',
      propertyType: 'APARTMENT' as const,
      status: 'PUBLISHED' as const,
      country: 'Japan',
      city: 'Tokyo',
      address: '2-21-1 Shibuya, Shibuya-ku, Tokyo',
      latitude: 35.6595,
      longitude: 139.7004,
      pricePerNight: 168,
      cleaningFee: 35,
      serviceFee: 22,
      maxGuests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1,
      instantBook: true,
      // Keeping existing Tokyo images as they were already updated and verified in previous step
      coverImage:
        'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1280&q=80',
      images: [
        'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1280&q=80',
        'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=1280&q=80',
        'https://images.unsplash.com/photo-1522771753035-4a5eb091b3ba?auto=format&fit=crop&w=1280&q=80',
      ],
      amenityNames: ['WiFi', 'Air Conditioning', 'Workspace', 'TV', 'Kitchen', 'Washer', 'City Skyline View'],
      hostIndex: 0, // host (Yuki)
    },
    {
      title: 'Authentic Kyoto Machiya Townhouse',
      description:
        'Beautifully restored 120-year-old wooden machiya in the Higashiyama district. Two-bedroom layout with authentic tatami floors, paper sliding doors, a private stone garden, and a deep hinoki cypress bath. Modern kitchen tucked behind traditional screens. Walk to Kiyomizu-dera in ten minutes.',
      propertyType: 'HOUSE' as const,
      status: 'PUBLISHED' as const,
      country: 'Japan',
      city: 'Kyoto',
      address: '3-322 Kiyomizu, Higashiyama-ku, Kyoto',
      latitude: 34.9949,
      longitude: 135.785,
      pricePerNight: 225,
      cleaningFee: 45,
      serviceFee: 30,
      maxGuests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 1,
      instantBook: false,
      coverImage:
        'https://a0.muscache.com/im/pictures/airflow/Hosting-37767082/original/4483346b-f648-4553-ba7e-192b55256e2e.jpg?im_w=720',
      images: [
        'https://a0.muscache.com/im/pictures/airflow/Hosting-37767082/original/4483346b-f648-4553-ba7e-192b55256e2e.jpg?im_w=720', // Living Room & Dining
        'https://a0.muscache.com/im/pictures/airflow/Hosting-37767082/original/6c540efc-40fe-48ab-9872-dd4c7fd7523c.jpg?im_w=720', // Tatami Room
        'https://a0.muscache.com/im/pictures/airflow/Hosting-37767082/original/78d62068-d160-4ba4-a9dd-84ad9634dae8.jpg?im_w=720', // Bedroom (Western Style)
        'https://a0.muscache.com/im/pictures/airflow/Hosting-37767082/original/aec4b783-ed7e-4da5-913f-7b6b597f4a0d.jpg?im_w=720', // Exterior/Facade
      ],
      amenityNames: ['WiFi', 'Air Conditioning', 'Kitchen', 'Tatami Room', 'Tea Ceremony Set', 'Temple View', 'Garden', 'Bicycle Rental'],
      hostIndex: 0, // host (Yuki)
    },

    // ── Thailand ──
    {
      title: 'Chao Phraya Riverside Luxury Suite',
      description:
        'Expansive two-bedroom suite overlooking the Chao Phraya River from the 34th floor. King-size beds with Egyptian cotton linens, marble-clad bathrooms with Hansgrohe fittings, and a panoramic living room with teak accents. Infinity pool and spa on the rooftop level. BTS Saphan Taksin a five-minute walk.',
      propertyType: 'APARTMENT' as const,
      status: 'PUBLISHED' as const,
      country: 'Thailand',
      city: 'Bangkok',
      address: '257/1-3 Charoennakorn Rd, Thonburi, Bangkok',
      latitude: 13.7234,
      longitude: 100.5098,
      pricePerNight: 112,
      cleaningFee: 25,
      serviceFee: 15,
      maxGuests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 2,
      instantBook: true,
      coverImage:
        'https://a0.muscache.com/im/pictures/hosting/Hosting-1461725211859404542/original/ef68dac2-ec17-4651-a7fc-e8f0425ebd8f.jpeg?im_w=720',
      images: [
        'https://a0.muscache.com/im/pictures/hosting/Hosting-1461725211859404542/original/ef68dac2-ec17-4651-a7fc-e8f0425ebd8f.jpeg?im_w=720',  // Living Room with View
        'https://a0.muscache.com/im/pictures/hosting/Hosting-1461725211859404542/original/b008ff45-9547-498b-b065-29ed0847ca98.jpeg?im_w=720', // Bedroom with View
        'https://a0.muscache.com/im/pictures/hosting/Hosting-1461725211859404542/original/1fc53e6b-d141-4968-92ec-675a40becc97.jpeg?im_w=720',  // Infinity Pool Context
      ],
      amenityNames: ['WiFi', 'Air Conditioning', 'Pool', 'Gym', 'Spa Access', 'City Skyline View', 'Concierge Service', 'TV'],
      hostIndex: 1, // host2 (Mei)
    },
    {
      title: 'Doi Suthep Hilltop Cottage with Jungle Views',
      description:
        'Hand-built teak cottage nestled in the Doi Suthep foothills. One cozy bedroom with a queen platform bed and mosquito-net canopy. Open-air bathroom with rain shower surrounded by tropical plants. Wraparound veranda with hammock and valley views. Breakfast basket delivered each morning.',
      propertyType: 'COTTAGE' as const,
      status: 'PUBLISHED' as const,
      country: 'Thailand',
      city: 'Chiang Mai',
      address: '145 Moo 6, Suthep, Muang, Chiang Mai',
      latitude: 18.8048,
      longitude: 98.9217,
      pricePerNight: 58,
      cleaningFee: 10,
      serviceFee: 8,
      maxGuests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1,
      instantBook: true,
      // Using existing images for Chiang Mai as no new ones provided in images.txt
      coverImage:
        'https://images.pexels.com/photos/2476632/pexels-photo-2476632.jpeg?auto=compress&cs=tinysrgb&w=1280',
      images: [
        'https://images.pexels.com/photos/2476632/pexels-photo-2476632.jpeg?auto=compress&cs=tinysrgb&w=1280',
        'https://images.pexels.com/photos/2983427/pexels-photo-2983427.jpeg?auto=compress&cs=tinysrgb&w=1280',
        'https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=1280',
      ],
      amenityNames: ['WiFi', 'Garden', 'Yoga Space', 'Bicycle Rental', 'Balcony'],
      hostIndex: 1, // host2 (Mei)
    },

    // ── South Korea ──
    {
      title: 'Stylish Gangnam Design Loft',
      description:
        'Award-winning interior-designed loft in the heart of Gangnam. Double-height ceilings with mezzanine sleeping loft, polished concrete floors, and floor-to-ceiling bookshelves. Italian espresso machine, B&O sound system, and a Juliet balcony overlooking Garosu-gil. Gangnam station two blocks away.',
      propertyType: 'LOFT' as const,
      status: 'PUBLISHED' as const,
      country: 'South Korea',
      city: 'Seoul',
      address: '17 Gangnam-daero 102-gil, Gangnam-gu, Seoul',
      latitude: 37.498,
      longitude: 127.0276,
      pricePerNight: 135,
      cleaningFee: 30,
      serviceFee: 18,
      maxGuests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1,
      instantBook: true,
      coverImage:
        'https://a0.muscache.com/im/pictures/miso/Hosting-1195771959172208052/original/efb2afe9-6959-4d4f-b58d-c65f761e6d59.jpeg?im_w=720',
      images: [
        'https://a0.muscache.com/im/pictures/miso/Hosting-1195771959172208052/original/efb2afe9-6959-4d4f-b58d-c65f761e6d59.jpeg?im_w=720', // Main Loft Space
        'https://a0.muscache.com/im/pictures/miso/Hosting-1195771959172208052/original/199f816e-3311-4ae9-8193-6662809f779a.jpeg?im_w=720', // Mezzanine/Stairs
        'https://a0.muscache.com/im/pictures/miso/Hosting-1195771959172208052/original/14635f1b-a98e-46a1-8757-6a56be16728e.jpeg?im_w=720', // Kitchen Area
      ],
      amenityNames: ['WiFi', 'Air Conditioning', 'TV', 'Workspace', 'Kitchen', 'Washer', 'City Skyline View', 'Balcony'],
      hostIndex: 2, // host3 (Soo-Jin)
    },
    {
      title: 'Jeju Island Stone House with Ocean Views',
      description:
        'Traditional Jeju stone house renovated with Scandinavian warmth. Volcanic basalt walls, underfloor heating, and a bright open-plan living area. Two bedrooms with memory-foam mattresses and blackout curtains. Private garden with an outdoor barbecue. Walk to Woljeongri Beach in eight minutes.',
      propertyType: 'HOUSE' as const,
      status: 'PUBLISHED' as const,
      country: 'South Korea',
      city: 'Jeju',
      address: '123 Woljeong-ri, Gujwa-eup, Jeju-si',
      latitude: 33.5563,
      longitude: 126.8559,
      pricePerNight: 98,
      cleaningFee: 20,
      serviceFee: 13,
      maxGuests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 1,
      instantBook: false,
      coverImage:
        'https://a0.muscache.com/im/pictures/0cf8675f-4a88-40de-8a0c-04c714386bf0.jpg?im_w=720',
      images: [
        'https://a0.muscache.com/im/pictures/0cf8675f-4a88-40de-8a0c-04c714386bf0.jpg?im_w=720', // Exterior & Stone Wall
        'https://a0.muscache.com/im/pictures/c190db57-fd0a-43dc-98ac-efd3ca2470ac.jpg?im_w=720', // Garden/Orchard Context
        'https://a0.muscache.com/im/pictures/0f087e97-d37b-41c5-a591-b817bfc93a41.jpg?im_w=720', // Interior Living Space
      ],
      amenityNames: ['WiFi', 'Air Conditioning', 'Kitchen', 'Parking', 'Garden', 'Washer', 'TV'],
      hostIndex: 2, // host3 (Soo-Jin)
    },

    // ── India ──
    {
      title: 'Royal Haveli Suite in the Pink City',
      description:
        'Opulent one-bedroom suite inside a restored 18th-century haveli in Jaipur old town. Hand-painted frescoes on the ceiling, carved sandstone jharokha windows, and a canopied king bed draped in block-printed Rajasthani textiles. En-suite bathroom with a copper soaking tub. Rooftop terrace with Hawa Mahal views.',
      propertyType: 'ROOM' as const,
      status: 'PUBLISHED' as const,
      country: 'India',
      city: 'Jaipur',
      address: '42 Gangauri Bazaar, Jaipur, Rajasthan',
      latitude: 26.9239,
      longitude: 75.8267,
      pricePerNight: 72,
      cleaningFee: 12,
      serviceFee: 10,
      maxGuests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1,
      instantBook: true,
      coverImage:
        'https://a0.muscache.com/im/pictures/a2f6472c-39fe-4a97-aea6-8165887a0acb.jpg?im_w=720',
      images: [
        'https://a0.muscache.com/im/pictures/a2f6472c-39fe-4a97-aea6-8165887a0acb.jpg?im_w=720', // Bedroom (Frescoes)
        'https://a0.muscache.com/im/pictures/6e03f408-4a78-44d1-8589-6609cfa513e7.jpg?im_w=720', // Archways/Interior
        'https://a0.muscache.com/im/pictures/830142b2-e089-4df6-a9a0-84de8b2e403c.jpg?im_w=720', // Rooftop/Courtyard
      ],
      amenityNames: ['WiFi', 'Air Conditioning', 'Rooftop Terrace', 'Concierge Service', 'Tea Ceremony Set', 'Temple View'],
      hostIndex: 1, // host2 (Mei)
    },
    {
      title: 'Tropical Beach Villa in South Goa',
      description:
        'Whitewashed Portuguese-era villa set among coconut palms, 200 meters from Palolem Beach. Two spacious bedrooms with four-poster beds and ceiling fans. Open-air living room flows into a private plunge pool. Outdoor kitchen with tandoor oven. Scooter rental arranged on request.',
      propertyType: 'VILLA' as const,
      status: 'PUBLISHED' as const,
      country: 'India',
      city: 'Goa',
      address: 'Palolem Beach Rd, Canacona, Goa',
      latitude: 15.0101,
      longitude: 74.0232,
      pricePerNight: 95,
      cleaningFee: 18,
      serviceFee: 13,
      maxGuests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 2,
      instantBook: true,
      coverImage:
        'https://a0.muscache.com/im/pictures/hosting/Hosting-363489/original/8866838c-d66c-4639-98b5-e8b1529f4cc5.jpeg?im_w=720',
      images: [
        'https://a0.muscache.com/im/pictures/hosting/Hosting-363489/original/8866838c-d66c-4639-98b5-e8b1529f4cc5.jpeg?im_w=720', // Exterior/Balcao
        'https://a0.muscache.com/im/pictures/hosting/Hosting-363489/original/0c258157-e13d-4436-a553-9930c423c0b5.jpeg?im_w=720', // Living Area
        'https://a0.muscache.com/im/pictures/hosting/Hosting-363489/original/c85a2787-3133-439a-8390-a85c1297d9bd.jpeg?im_w=720', // Bedroom (Four Poster)
      ],
      amenityNames: ['WiFi', 'Pool', 'Kitchen', 'Garden', 'Yoga Space', 'Balcony', 'Parking'],
      hostIndex: 1, // host2 (Mei)
    },

    // ── Indonesia ──
    {
      title: 'Ubud Rice Terrace Villa with Infinity Pool',
      description:
        'Open-air Balinese villa overlooking the Tegallalang rice terraces. Two bedrooms with hand-carved teak furnishings and stone-walled outdoor showers. Infinity pool appears to float above the valley. Included: daily breakfast, afternoon tea, and one complimentary 60-minute Balinese massage per stay.',
      propertyType: 'VILLA' as const,
      status: 'PUBLISHED' as const,
      country: 'Indonesia',
      city: 'Bali',
      address: 'Jl. Raya Tegallalang, Ubud, Gianyar, Bali',
      latitude: -8.4312,
      longitude: 115.2792,
      pricePerNight: 185,
      cleaningFee: 30,
      serviceFee: 25,
      maxGuests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 2,
      instantBook: true,
      coverImage:
        'https://images.trvl-media.com/lodging/43000000/42010000/42000600/42000542/w1997h1333x3y0-a500da5d.jpg?impolicy=resizecrop&rw=297&ra=fit',
      images: [
        'https://images.trvl-media.com/lodging/43000000/42010000/42000600/42000542/w1997h1333x3y0-a500da5d.jpg?impolicy=resizecrop&rw=297&ra=fit', // Infinity Pool & View
        'https://images.trvl-media.com/lodging/43000000/42010000/42000600/42000542/w1996h1333x4y0-b53e12cf.jpg?impolicy=resizecrop&rw=598&ra=fit', // Bedroom Interior
        'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1280&q=80', // Keep one flexible nice image or duplicate one
      ],
      amenityNames: ['WiFi', 'Pool', 'Spa Access', 'Rice Field View', 'Yoga Space', 'Garden', 'Air Conditioning', 'Concierge Service'],
      hostIndex: 1, // host2 (Mei)
    },

    // ── Vietnam ──
    {
      title: 'Hanoi Old Quarter Heritage Studio',
      description:
        'Charming studio tucked above a lantern-lit alley in the Old Quarter. Exposed brick walls, polished teak floors, and a queen platform bed dressed in Vietnamese silk. Compact kitchenette and a balcony just wide enough for morning pho from the street vendor below. Steps from Hoan Kiem Lake.',
      propertyType: 'STUDIO' as const,
      status: 'PUBLISHED' as const,
      country: 'Vietnam',
      city: 'Hanoi',
      address: '47 Hang Bac, Hoan Kiem, Hanoi',
      latitude: 21.0341,
      longitude: 105.8528,
      pricePerNight: 32,
      cleaningFee: 5,
      serviceFee: 4,
      maxGuests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1,
      instantBook: true,
      coverImage:
        'https://a0.muscache.com/im/pictures/78409fa3-b49d-41aa-9f7e-50cc461635ac.jpg?im_w=720',
      images: [
        'https://a0.muscache.com/im/pictures/78409fa3-b49d-41aa-9f7e-50cc461635ac.jpg?im_w=720', // Studio Interior
        'https://a0.muscache.com/im/pictures/3fc7873d-a65f-4825-901b-c23a1d078539.jpg?im_w=720', // Balcony/Window View
        'https://a0.muscache.com/im/pictures/hosting/Hosting-32560205/original/f69bf355-bc9b-410e-9be3-4238e17cb95a.jpeg?im_w=720', // Bedroom Detail
      ],
      amenityNames: ['WiFi', 'Air Conditioning', 'Balcony', 'Kitchen', 'Bicycle Rental'],
      hostIndex: 1, // host2 (Mei)
    },

    // ── Sri Lanka ──
    {
      title: 'Colonial Fort House in Galle',
      description:
        'Grand three-bedroom heritage home inside the UNESCO-listed Galle Fort. Dutch-colonial architecture with 4-meter ceilings, antique four-poster beds, and terrazzo floors. Private courtyard with frangipani trees and a daybed. Rooftop terrace faces the Indian Ocean. Full-time housekeeper included.',
      propertyType: 'HOUSE' as const,
      status: 'PUBLISHED' as const,
      country: 'Sri Lanka',
      city: 'Galle',
      address: '56 Pedlar Street, Galle Fort, Galle',
      latitude: 6.0269,
      longitude: 80.2171,
      pricePerNight: 145,
      cleaningFee: 25,
      serviceFee: 19,
      maxGuests: 6,
      bedrooms: 3,
      beds: 3,
      bathrooms: 2,
      instantBook: false,
      coverImage:
        'https://images.squarespace-cdn.com/content/v1/5e26e40c1a1efa04733c4f15/1579764425598-WJVCH97RDZKVVHLCNLRW/IMG_0168.jpg',
      images: [
        'https://images.squarespace-cdn.com/content/v1/5e26e40c1a1efa04733c4f15/1579764425598-WJVCH97RDZKVVHLCNLRW/IMG_0168.jpg', // Courtyard Pool
        'https://images.squarespace-cdn.com/content/v1/5e26e40c1a1efa04733c4f15/1579764498684-MFN37AUZXDAVHTIFH33J/IMG_0182.jpg', // Interior/Decor
        'https://a0.muscache.com/im/pictures/hosting/Hosting-10739828/original/a6bf1b5a-82f7-4047-a059-8fbb266c35ea.jpeg?im_w=720', // Veranda/Archways
      ],
      amenityNames: ['WiFi', 'Air Conditioning', 'Kitchen', 'Garden', 'Rooftop Terrace', 'Concierge Service', 'TV'],
      hostIndex: 1, // host2 (Mei)
    },

    // ── Singapore ──
    {
      title: 'Marina Bay Skyline Apartment',
      description:
        'Designer two-bedroom apartment on the 42nd floor of a Marina Bay tower. Wraparound glass walls frame the Gardens by the Bay and the Marina Bay Sands laser show each night. Italian marble en-suites, Miele kitchen, wine fridge, and a private lift lobby. Rooftop infinity pool shared among six units only.',
      propertyType: 'APARTMENT' as const,
      status: 'PUBLISHED' as const,
      country: 'Singapore',
      city: 'Singapore',
      address: '18 Marina Gardens Drive, Singapore',
      latitude: 1.2816,
      longitude: 103.8636,
      pricePerNight: 295,
      cleaningFee: 50,
      serviceFee: 40,
      maxGuests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 2,
      instantBook: true,
      // No new images for Singapore in text, keep existing? Or use generic high quality?
      // Text file has none. Keep existing.
      coverImage:
        'https://d1hy6t2xeg0mdl.cloudfront.net/image/670359/be7f9df57c/720-width',
      images: [
        'https://d1hy6t2xeg0mdl.cloudfront.net/image/670359/be7f9df57c/720-width', // Living Room/View
        'https://d1hy6t2xeg0mdl.cloudfront.net/image/670359/be7f9df57c/720-width', // Bedroom
        'https://d1hy6t2xeg0mdl.cloudfront.net/image/670349/d570e85077/720-width', // Kitchen
      ],
      amenityNames: ['WiFi', 'Air Conditioning', 'Pool', 'Gym', 'Kitchen', 'City Skyline View', 'Concierge Service', 'Washer', 'TV'],
      hostIndex: 1, // host2 (Mei)
    },

    // ── Malaysia ──
    {
      title: 'Petronas Twin Towers View Apartment',
      description:
        'Stylish two-bedroom unit in KLCC with unobstructed Petronas Towers views from the living room and master bedroom. Contemporary furnishings, king beds, rainfall showers, and a fully fitted kitchen. Building amenities include a 50-meter lap pool, sauna, and direct skybridge link to Suria KLCC mall.',
      propertyType: 'APARTMENT' as const,
      status: 'PUBLISHED' as const,
      country: 'Malaysia',
      city: 'Kuala Lumpur',
      address: '8 Jalan Ampang, KLCC, Kuala Lumpur',
      latitude: 3.1579,
      longitude: 101.7116,
      pricePerNight: 78,
      cleaningFee: 15,
      serviceFee: 10,
      maxGuests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 1,
      instantBook: true,
      coverImage:
        'https://a0.muscache.com/im/pictures/miso/Hosting-30282821/original/dcee3c27-f290-4efa-8a1e-95a5a429b306.jpeg?im_w=720',
      images: [
        'https://a0.muscache.com/im/pictures/miso/Hosting-30282821/original/dcee3c27-f290-4efa-8a1e-95a5a429b306.jpeg?im_w=720', // Living Room View
        'https://a0.muscache.com/im/pictures/miso/Hosting-30282821/original/aac5e6c3-7c94-4b33-9d02-6c68f8b7e67b.jpeg?im_w=720', // Bedroom
        'https://a0.muscache.com/im/pictures/miso/Hosting-1051895901634201144/original/87eb2229-7e81-4026-ae44-0b343e94f50c.png?im_w=720', // Pool/Skyline
      ],
      amenityNames: ['WiFi', 'Air Conditioning', 'Pool', 'Gym', 'Kitchen', 'City Skyline View', 'Parking', 'TV'],
      hostIndex: 1, // host2 (Mei)
    },

    // ── Philippines ──
    {
      title: 'Trendy Makati Loft near BGC',
      description:
        'Industrial-chic loft in Makati, the creative hub of Metro Manila. Exposed concrete ceilings and ductwork contrast with warm acacia-wood accents and local art pieces. Queen bed on the mezzanine, full kitchen below, and a curated vinyl collection. Rooftop bar access included. Ten minutes to Bonifacio Global City.',
      propertyType: 'LOFT' as const,
      status: 'PUBLISHED' as const,
      country: 'Philippines',
      city: 'Manila',
      address: '148 Legazpi St, Makati, Metro Manila',
      latitude: 14.5547,
      longitude: 121.0244,
      pricePerNight: 55,
      cleaningFee: 10,
      serviceFee: 7,
      maxGuests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1,
      instantBook: true,
      // No new images in txt for Manila. Keeping existing.
      coverImage:
        'https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?auto=compress&cs=tinysrgb&w=1280',
      images: [
        'https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?auto=compress&cs=tinysrgb&w=1280', // Industrial loft
        'https://images.pexels.com/photos/245208/pexels-photo-245208.jpeg?auto=compress&cs=tinysrgb&w=1280',  // Bedroom
        'https://images.pexels.com/photos/3935320/pexels-photo-3935320.jpeg?auto=compress&cs=tinysrgb&w=1280', // Living details
      ],
      amenityNames: ['WiFi', 'Air Conditioning', 'TV', 'Kitchen', 'Rooftop Terrace', 'Workspace'],
      hostIndex: 1, // host2 (Mei)
    },

    // ── Hong Kong ──
    {
      title: 'Victoria Peak Panoramic Room',
      description:
        'Premium room on the 56th floor of a Mid-Levels tower with floor-to-ceiling harbour views. King bed with Frette linens, marble rain shower, Dyson hairdryer, and a curated minibar of local craft spirits. Access to residents-only sky lounge with complimentary evening canapes. Peak Tram two minutes away.',
      propertyType: 'ROOM' as const,
      status: 'PUBLISHED' as const,
      country: 'Hong Kong',
      city: 'Hong Kong',
      address: '23 Conduit Rd, Mid-Levels, Hong Kong',
      latitude: 22.2813,
      longitude: 114.151,
      pricePerNight: 210,
      cleaningFee: 40,
      serviceFee: 28,
      maxGuests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1,
      instantBook: true,
      coverImage:
        'https://a0.muscache.com/im/pictures/miso/Hosting-1441031040226888694/original/aecc20f1-d09e-409f-875c-1854f897c15e.jpeg?im_w=720',
      images: [
        'https://a0.muscache.com/im/pictures/miso/Hosting-1441031040226888694/original/aecc20f1-d09e-409f-875c-1854f897c15e.jpeg?im_w=720', // Balcony View
        'https://a0.muscache.com/im/pictures/miso/Hosting-1441031040226888694/original/82edf9fe-cee4-4151-9b97-fa70c46af9ab.jpeg?im_w=720', // Bedroom
        'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=1280', // Interior details (keeping one)
      ],
      amenityNames: ['WiFi', 'Air Conditioning', 'TV', 'City Skyline View', 'Concierge Service', 'Gym', 'Spa Access'],
      hostIndex: 1, // host2 (Mei)
    },

    // ── Uzbekistan ──
    {
      title: 'Silk Road Heritage House near Registan',
      description:
        'Lovingly restored three-bedroom courtyard house steps from the Registan. Handmade Uzbek suzani tapestries, carved ganch plasterwork, and kilim-covered seating nooks. Central courtyard with a mulberry tree, outdoor dining table, and a clay tandoor oven. Breakfast of fresh non bread and green tea included.',
      propertyType: 'HOUSE' as const,
      status: 'PUBLISHED' as const,
      country: 'Uzbekistan',
      city: 'Samarkand',
      address: '15 Registan St, Samarkand',
      latitude: 39.6547,
      longitude: 66.9597,
      pricePerNight: 45,
      cleaningFee: 8,
      serviceFee: 6,
      maxGuests: 6,
      bedrooms: 3,
      beds: 3,
      bathrooms: 2,
      instantBook: false,
      coverImage:
        'https://itin-dev.wanderlogstatic.com/freeImage/VYb9pdGvJypmCLgLnWeD23Z9Q2FCm3AZ',
      images: [
        'https://itin-dev.wanderlogstatic.com/freeImage/VYb9pdGvJypmCLgLnWeD23Z9Q2FCm3AZ', // Courtyard/Exterior
        'https://itin-dev.wanderlogstatic.com/freeImage/QsceFDon5uQSNa0ifRcga0yFzfj0qsIt', // Suzani/Decor
        'https://itin-dev.wanderlogstatic.com/freeImage/VjtOsJxTIFuCOhnYdhOpr7d0ETuUCQOa', // Dining Area
      ],
      amenityNames: ['WiFi', 'Kitchen', 'Garden', 'Tea Ceremony Set', 'Parking', 'Airport Shuttle'],
      hostIndex: 0, // host (Yuki)
    },

    // ── East Asia (Batch 2) ──
    {
      title: 'Shanghai Art Deco Heritage Apartment',
      description:
        'Renovated historic apartment in the Former French Concession. "Paris of the East" revival with high ceilings, steel-framed windows, and terrazzo floors. A blend of colonial history and modern "Shanghai Chic".',
      propertyType: 'APARTMENT' as const,
      status: 'PUBLISHED' as const,
      country: 'China',
      city: 'Shanghai',
      address: 'Huaihai Middle Road, Xuhui District, Shanghai',
      latitude: 31.2155,
      longitude: 121.4568,
      pricePerNight: 145,
      cleaningFee: 25,
      serviceFee: 15,
      maxGuests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1,
      instantBook: true,
      coverImage:
        'https://www.designpataki.com/wp-content/uploads/2020/02/Baptiste_Bohu_french_designer_shanghai_03.jpg',
      images: [
        'https://www.designpataki.com/wp-content/uploads/2020/02/Baptiste_Bohu_french_designer_shanghai_03.jpg',
        'https://www.designpataki.com/wp-content/uploads/2020/02/B29388FE-A246-4C32-8873-5EC1BC43E58A.jpeg',
      ],
      amenityNames: ['WiFi', 'Air Conditioning', 'Kitchen', 'City Skyline View', 'Washer'],
      hostIndex: 2, // Soo-Jin (Designer)
    },
    {
      title: 'Beijing Imperial Courtyard (Siheyuan)',
      description:
        'Private courtyard residence in the Dongsi preservation zone. Grey brick walls, elm wood beams, and a central pomegranate tree. Modernized subterranean media room brings "Ground Qi" to luxury living.',
      propertyType: 'HOUSE' as const,
      status: 'PUBLISHED' as const,
      country: 'China',
      city: 'Beijing',
      address: 'Dongsi Subdistrict, Dongcheng, Beijing',
      latitude: 39.9298,
      longitude: 116.417,
      pricePerNight: 280,
      cleaningFee: 50,
      serviceFee: 30,
      maxGuests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 2,
      instantBook: false,
      coverImage:
        'https://beijing.maxviewrealty.com/img/2020-03-02/dongsi-courtyard-473-316-7835.jpg',
      images: [
        'https://beijing.maxviewrealty.com/img/2020-03-02/dongsi-courtyard-473-316-7835.jpg',
        'https://beijing.maxviewrealty.com/img/2024-01-08/dongsi-courtyard-%E4%B8%9C%E5%9B%9B%E5%9B%9B%E5%90%88%E9%99%A2-473-316-8269.jpg',
        'https://beijing.maxviewrealty.com/img/2024-01-26/dongsiqitiao-courtyard-%E4%B8%9C%E5%9B%9B%E4%B8%83%E6%9D%A1%E8%83%A1%E5%90%8C-473-316-8380.jpg',
      ],
      amenityNames: ['WiFi', 'Air Conditioning', 'Garden', 'Kitchen', 'Tea Ceremony Set', 'Parking'],
      hostIndex: 0, // Yuki (Heritage)
    },
    {
      title: 'Taipei 101 View Penthouse',
      description:
        'Modern duplex penthouse in Xinyi District. Floor-to-ceiling glass offers an unobstructed view of Taipei 101. Earthquake-proof engineering meets Zen Modernist aesthetics with pale woods and stone.',
      propertyType: 'APARTMENT' as const,
      status: 'PUBLISHED' as const,
      country: 'Taiwan',
      city: 'Taipei',
      address: 'Xinyi District, Taipei',
      latitude: 25.033,
      longitude: 121.5654,
      pricePerNight: 350,
      cleaningFee: 60,
      serviceFee: 50,
      maxGuests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 2,
      instantBook: true,
      coverImage:
        'https://a0.muscache.com/im/pictures/hosting/Hosting-1462789449803657139/original/9ea37a67-36ff-46ab-ac60-5e98b18890c3.png?im_w=720',
      images: [
        'https://a0.muscache.com/im/pictures/hosting/Hosting-1462789449803657139/original/9ea37a67-36ff-46ab-ac60-5e98b18890c3.png?im_w=720',
        'https://a0.muscache.com/im/pictures/hosting/Hosting-1462789449803657139/original/d07baa17-b326-4487-a9bf-a6a7f19152ca.png?im_w=720',
        'https://a0.muscache.com/im/pictures/hosting/Hosting-1462789449803657139/original/843c949d-afa8-43b8-8fb0-1f598b4df097.png?im_w=720',
      ],
      amenityNames: ['WiFi', 'Air Conditioning', 'City Skyline View', 'Kitchen', 'Gym', 'Concierge Service'],
      hostIndex: 1, // Mei (Luxury)
    },
    {
      title: 'Jeju Traditional Choga Stone House',
      description:
        'Renovated stone cottage (Choga) with volcanic basalt walls and a tangerine orchard. Wood and white interior design creates a warm, minimalist atmosphere. Located in Seogwipo.',
      propertyType: 'HOUSE' as const,
      status: 'PUBLISHED' as const,
      country: 'South Korea',
      city: 'Jeju',
      address: 'Seogwipo, Jeju Island',
      latitude: 33.2541,
      longitude: 126.5601,
      pricePerNight: 110,
      cleaningFee: 20,
      serviceFee: 15,
      maxGuests: 3,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1,
      instantBook: false,
      coverImage:
        'https://a0.muscache.com/im/pictures/0cf8675f-4a88-40de-8a0c-04c714386bf0.jpg?im_w=720',
      images: [
        'https://a0.muscache.com/im/pictures/0cf8675f-4a88-40de-8a0c-04c714386bf0.jpg?im_w=720',
        'https://a0.muscache.com/im/pictures/0f087e97-d37b-41c5-a591-b817bfc93a41.jpg?im_w=720',
        'https://a0.muscache.com/im/pictures/c190db57-fd0a-43dc-98ac-efd3ca2470ac.jpg?im_w=720',
      ],
      amenityNames: ['WiFi', 'Air Conditioning', 'Garden', 'Kitchen', 'Parking'],
      hostIndex: 2, // Soo-Jin (Korean)
    },

    // ── Central Asia (Batch 2) ──
    {
      title: 'Mongolian Luxury Ger Camp',
      description:
        'Deluxe Ger (Yurt) in Terelj National Park. "Nomadic Modernism" with felt insulation, ensuite bathroom, heated floors, and steppe views. Wooden platforms and carved orange lattice walls.',
      propertyType: 'OTHER' as const,
      status: 'PUBLISHED' as const,
      country: 'Mongolia',
      city: 'Ulaanbaatar',
      address: 'Terelj National Park, Mongolia',
      latitude: 47.99,
      longitude: 107.5,
      pricePerNight: 120,
      cleaningFee: 0,
      serviceFee: 10,
      maxGuests: 4,
      bedrooms: 1,
      beds: 2,
      bathrooms: 1,
      instantBook: true,
      coverImage:
        'https://cdn.greensoft.mn/uploads/site/595/photos/block/s_20190315133823_f750edb1b7e83cf0b9b94aaa722440af.JPG',
      images: [
        'https://cdn.greensoft.mn/uploads/site/595/photos/block/s_20190315133823_f750edb1b7e83cf0b9b94aaa722440af.JPG',
        'https://cdn.greensoft.mn/uploads/site/595/photos/block/s_20190315133825_d89af7f74c81ca3ecd7992f0415bac47.JPG',
        'https://cdn.greensoft.mn/uploads/site/595/photos/block/s_20211008171900_d0096ec6c83575373e3a21d129ff8fef.jpg',
      ],
      amenityNames: ['WiFi', 'Garden', 'Breakfast Included', 'Parking'],
      hostIndex: 0, // Yuki (Authentic)
    },
    {
      title: 'Almaty Mountain Chalet',
      description:
        'Alpine lodge in Shymbulak. Post-Soviet Swiss style with timber beams and panoramic window walls facing the snow-capped Trans-Ili Alatau mountains. Includes sauna.',
      propertyType: 'CABIN' as const,
      status: 'PUBLISHED' as const,
      country: 'Kazakhstan',
      city: 'Almaty',
      address: 'Shymbulak Ski Resort, Almaty',
      latitude: 43.12,
      longitude: 77.08,
      pricePerNight: 180,
      cleaningFee: 40,
      serviceFee: 20,
      maxGuests: 6,
      bedrooms: 3,
      beds: 3,
      bathrooms: 2,
      instantBook: false,
      coverImage:
        'https://a0.muscache.com/im/pictures/58ecc7d9-45ab-4e79-9c1c-37a8690989ae.jpg?im_w=720',
      images: [
        'https://a0.muscache.com/im/pictures/58ecc7d9-45ab-4e79-9c1c-37a8690989ae.jpg?im_w=720',
        'https://a0.muscache.com/im/pictures/1232c3f4-8f1e-4474-a2b9-13dbfc3fa4dc.jpg?im_w=720',
        'https://a0.muscache.com/im/pictures/00ddf05e-1013-4ec6-8e38-d4ace51c332a.jpg?im_w=720',
      ],
      amenityNames: ['WiFi', 'Air Conditioning', 'Kitchen', 'Hot Tub', 'Parking', 'Garden'],
      hostIndex: 0,
    },
    {
      title: 'Bukhara Merchant Heritage House',
      description:
        '18th Century Jewish/Merchant house in the Old City. Intricate plaster (ganch), heavy wood columns, and a central courtyard. Features suzani textiles as authentic functional decor.',
      propertyType: 'HOUSE' as const,
      status: 'PUBLISHED' as const,
      country: 'Uzbekistan',
      city: 'Bukhara',
      address: 'Old City, Bukhara',
      latitude: 39.77,
      longitude: 64.42,
      pricePerNight: 65,
      cleaningFee: 10,
      serviceFee: 8,
      maxGuests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 1,
      instantBook: true,
      coverImage:
        'https://a0.muscache.com/im/pictures/hosting/Hosting-39723075/original/7c710fc6-8f62-41f2-9a48-0c01b625b2cb.jpeg?im_w=720',
      images: [
        'https://a0.muscache.com/im/pictures/hosting/Hosting-39723075/original/7c710fc6-8f62-41f2-9a48-0c01b625b2cb.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/hosting/Hosting-39723075/original/45929f81-7bb5-47d4-b8ee-5244cc8f31d5.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/hosting/Hosting-39723075/original/c7389b94-aaac-490d-9072-321d337ed1c1.jpeg?im_w=720',
      ],
      amenityNames: ['WiFi', 'Kitchen', 'Garden', 'Tea Ceremony Set'],
      hostIndex: 0,
    },
    {
      title: 'Issyk-Kul Lakeside Yurt',
      description:
        'Kyrgyz Yurt Camp on the South Shore of Issyk-Kul. Eco-Glamping with bentwood frames and Shyrdak felt rugs. Direct access to the beach.',
      propertyType: 'OTHER' as any,
      status: 'PUBLISHED' as const,
      country: 'Kyrgyzstan',
      city: 'Tosor',
      address: 'Tosor, Issyk-Kul Region',
      latitude: 42.18,
      longitude: 77.45,
      pricePerNight: 40,
      cleaningFee: 5,
      serviceFee: 5,
      maxGuests: 3,
      bedrooms: 1,
      beds: 3,
      bathrooms: 1,
      instantBook: true,
      coverImage: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/270493176.jpg?k=59940b8daebcd98caa74d7efdc258692b7da100beb19edf3b7331bfc9871118c&o=',
      images: [
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/270493176.jpg?k=59940b8daebcd98caa74d7efdc258692b7da100beb19edf3b7331bfc9871118c&o=',
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/269700404.jpg?k=d5001c5db3bd4bbc7324fddf7769b706f9707393da366c5720062a04e5ee7ef4&o=',
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/270493318.jpg?k=360dc9a4bf1c999e6a4ae44ed5509187bee24ac12e4f36927ec84d2bea5031f8&o=',
      ],
      amenityNames: ['WiFi', 'Garden', 'Breakfast Included'],
      hostIndex: 0,
    },

    // ── South Asia (Batch 2) ──
    {
      title: 'Kathmandu Newari Heritage Home',
      description:
        'Restored brick & timber house in Patan. Exposed dachi appa brick, intricately carved black wood windows (jhyal), and low ceilings for a cozy living museum experience.',
      propertyType: 'HOUSE' as const,
      status: 'PUBLISHED' as const,
      country: 'Nepal',
      city: 'Kathmandu',
      address: 'Patan Durbar Square, Lalitpur',
      latitude: 27.67,
      longitude: 85.32,
      pricePerNight: 50,
      cleaningFee: 10,
      serviceFee: 5,
      maxGuests: 3,
      bedrooms: 1,
      beds: 2,
      bathrooms: 1,
      instantBook: true,
      coverImage:
        'https://a0.muscache.com/im/pictures/miso/Hosting-679203563763640454/original/985c9cc1-f149-476b-8289-09023b8e11be.jpeg?im_w=720',
      images: [
        'https://a0.muscache.com/im/pictures/miso/Hosting-679203563763640454/original/985c9cc1-f149-476b-8289-09023b8e11be.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/miso/Hosting-679203563763640454/original/723b4340-14f9-44f6-8f86-054ac28f9933.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/miso/Hosting-679203563763640454/original/299595f4-4828-4d8d-a6a8-50b7c64c80e4.jpeg?im_w=720',
      ],
      amenityNames: ['WiFi', 'Kitchen', 'Temple View'],
      hostIndex: 1,
    },
    {
      title: 'Pokhara Annapurna View Villa',
      description:
        'Hillside apartment in Sarangkot with unobstructed views of the Himalayas (Machhapuchhre). Large balconies and minimalist interiors to focus on the view economy.',
      propertyType: 'APARTMENT' as const,
      status: 'PUBLISHED' as const,
      country: 'Nepal',
      city: 'Pokhara',
      address: 'Sarangkot, Pokhara',
      latitude: 28.24,
      longitude: 83.94,
      pricePerNight: 85,
      cleaningFee: 15,
      serviceFee: 10,
      maxGuests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 1,
      instantBook: true,
      coverImage:
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/367397409.jpg?k=b506d81cb1a53a2503211821aac75843d04469a1ebdee3c6c685c267ca684531&o=',
      images: [
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/367397409.jpg?k=b506d81cb1a53a2503211821aac75843d04469a1ebdee3c6c685c267ca684531&o=',
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/510967520.jpg?k=4342b78221bf5cd72cddea96928e98ef801ed72c46a4630006e3d6630f12d655&o=',
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/229116843.jpg?k=509e2a712f9bd7cb20af5fd6eba83f677cfd65c06fd6447d8bf8f9e3e0061a2d&o=',
      ],
      amenityNames: ['WiFi', 'Kitchen', 'Balcony', 'Hiking'],
      hostIndex: 1,
    },
    {
      title: 'Bhutanese Rammed Earth Farmhouse',
      description:
        'Traditional farmstay in Phunakha. Vernacular earth construction with thick mud walls and painted woodwork. Features a hot stone bath amenity.',
      propertyType: 'HOUSE' as const,
      status: 'PUBLISHED' as const,
      country: 'Bhutan',
      city: 'Punakha',
      address: 'Punakha Valley, Bhutan',
      latitude: 27.59,
      longitude: 89.87,
      pricePerNight: 160,
      cleaningFee: 30,
      serviceFee: 20,
      maxGuests: 4,
      bedrooms: 2,
      beds: 3,
      bathrooms: 1,
      instantBook: false,
      coverImage:
        'https://a0.muscache.com/im/pictures/hosting/Hosting-53857647/original/038ec66d-1756-42d4-b46b-29a399f9392e.jpeg?im_w=720',
      images: [
        'https://a0.muscache.com/im/pictures/hosting/Hosting-53857647/original/038ec66d-1756-42d4-b46b-29a399f9392e.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/hosting/Hosting-53857647/original/f8b9e607-f12a-4428-8687-f83424d8525b.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/hosting/Hosting-53857647/original/234f95e5-3974-4b44-9fa7-640a33118546.jpeg?im_w=720',
      ],
      amenityNames: ['WiFi', 'Kitchen', 'Garden', 'Hot Tub'],
      hostIndex: 1,
    }
];

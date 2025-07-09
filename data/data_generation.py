"""Modules to Create Fake Data for Duck Themed Sporting goods store"""

import random
from faker import Faker


class DuckProductGenerator():
    """Object for generating fake products"""

    def __init__(self):
        self.fake = Faker()
        self.products = {
            "Water Training Equipment" : [
                "Duck Sized flippers",
                "Waterproof fitness trackers (wing bands)",
                "Resistance paddles for wing strength",
                "Underwater Obstacle courses",
                "Diving weight belts for deep-diving practice",
                "Floating training platforms"
            ],
            "Flight Training Gear" : [
                "Wing Strenghting Bands",
                "Areodynamic Flight Helments",
                "Altitude Training Masks",
                "Migration Route GPS Devices",
                "Lightweight wing supports for endurance flights"
                "Wind Resistance Training Parachutes" 
            ],
            "Duck Athletics Apparel" : [
                "Waterproof Feather Conditioners",
                "Protective Bill Guards for Water Sports",
                "Anti-fog Swimming Googles",
                "Reflective Night-Flight Vests",
                "Specialized Webbed Foot Grips for Slippery Surfaces",
                "LightWeight Quick Dry Towels for After Swim",

            ],
            "Team Sports Equipment" : [
                "Duck Sized Water Polo Balls",
                "Floating Basketball Hoops",
                "Pond Hockey Sticks and Pucks",
                "Synchronized Swimming Routines Guidebook",
                "Duckmiton Rackets and Shuttlecocks",
                "Water Volleyball Nets"
            ],
            "Duck Nutrition and Recovery" : [
                "Premium Seed and Grain Protein Mixes"
                "Hydration Supplements for Long Migrations"
                "Recovery Feed for Post-Workout",
                "Pre Workout",
                "Floating Food Dispensers for Water Training",
                "Energy-packed Breadcrumb Alternatives",
                "Pond-To-Table Organic Snacks"
            ],
            "Performance Enhancers" : [
                "MegaQuack Creatine Pellets",
                "WaddleMax Serum",
                "Feather Flex Plus",
                "Mallard Mass Gainer",
                "Quackstack Beak Drops",
                "Peckformance Enhancer Gel",
                "Ducksterone Boosters",
                "Juice the Goose XL"
            ]
        }
        self.adjectives = [
            "Elite",
            "Custom-Fitted",
            "Pro-Grade",
            "Featherlight",
            "Avian-Endorsed",
            "Waterproof",
            "Web-Safe",
            "Pond-Tested",
            "Durable",
            "Competition-Level"
        ]
        self.descriptors = [
            "Ideal for High-Performance Pond Play",
            "Used in the Annual Duckathlon",
            "tested by champion mallards",
            "engineered for maximum waddle efficiency"
        ]

    def generate_product(self):
        """Method for generating a random product of any category"""

        category = random.choice(list(self.products.keys()))
        item = random.choice(list(self.products[category]))
        full_product_name = f"{random.choice(self.adjectives)} {item}"
        description = f"{self.fake.sentence()} {random.choice(self.descriptors)}"
        price = round(random.uniform(5.00, 99.99), 2)
        sku = self.fake.unique.ean(lenght=13)

        return {
            "product name" : full_product_name,
            "description" : description,
            "category" : category,
            "price" : price,
            "sku" : sku
        }










if __name__ == "__main__":
    pass

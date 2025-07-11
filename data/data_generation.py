"""Modules to Create Fake Data for Duck Themed Sporting goods store"""

import random
from faker import Faker
import ollama
import json

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

    def generate_product(self, popularity_rank):
        """Method for generating a random product of any category"""

        category = random.choice(list(self.products.keys()))
        item = random.choice(list(self.products[category]))
        full_product_name = f"{random.choice(self.adjectives)} {item}"

        # Querys the mistral model for a simple description about the product
        response = ollama.chat(
        model='mistral',
        messages=[
            {'role': 'user', 'content': f"Give me a description for a product made for ducks called {full_product_name}. Make it no more than 3 sentences long"}
        ]
        )   

        description = response['message']['content'] 
        price = round(random.uniform(5.00, 99.99), 2)
        sku = self.fake.unique.ean(length=13)
        durability = random.randint(1, 10)
        
        return {
            "product name" : full_product_name,
            "description" : description,
            "category" : category,
            "price" : price,
            "sku" : sku,
            "popularity" : popularity_rank,
            "durability" : durability
        }

    def generate_products(self, n):
        """Method to generate n products with random popularity rankings. 
        Dumps product info into a file called products.json"""
        prods = []
        popularity = {i for i in range(n)}

        for _ in range(n):
            rank = random.choice(list(popularity))
            prods.append(self.generate_product(rank))
            popularity.remove(rank)

        # Write to a JSON file
        with open("products.json", "w", encoding="utf-8") as f:
            json.dump(prods, f, indent=4)


if __name__ == "__main__":
    # Create the fake products
    product_gen = DuckProductGenerator()
    product_gen.generate_products(1000)


#!/usr/bin/env python3
"""
Scrape high-quality room/interior images from the web for seed data.
Uses multiple free image sources (Pexels, Pixabay) to find FHD+ hotel room photos.
"""

import json
import urllib.request
import urllib.parse
import os
import sys

# We'll use Pexels API (free, 200 req/hr) for high-quality room photos
# Fallback: use curated, known-good URLs from multiple sources

def search_pexels(query, api_key, per_page=5):
    """Search Pexels for images matching query."""
    url = f"https://api.pexels.com/v1/search?query={urllib.parse.quote(query)}&per_page={per_page}&orientation=landscape"
    req = urllib.request.Request(url, headers={"Authorization": api_key})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read())
            return [p["src"]["large2x"] for p in data.get("photos", [])]
    except Exception as e:
        print(f"  Pexels error for '{query}': {e}")
        return []

def search_pixabay(query, api_key, per_page=5):
    """Search Pixabay for images matching query."""
    url = f"https://pixabay.com/api/?key={api_key}&q={urllib.parse.quote(query)}&image_type=photo&orientation=horizontal&min_width=1280&per_page={per_page}&category=travel"
    try:
        with urllib.request.urlopen(url, timeout=10) as resp:
            data = json.loads(resp.read())
            return [h["largeImageURL"] for h in data.get("hits", [])]
    except Exception as e:
        print(f"  Pixabay error for '{query}': {e}")
        return []


# Curated high-quality room/interior photos from multiple free sources
# These are stable, direct URLs to FHD+ interior/room images
CURATED_IMAGES = {
    "tokyo_apartment": [
        "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260",
        "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260",
        "https://images.pexels.com/photos/439227/pexels-photo-439227.jpeg?auto=compress&cs=tinysrgb&w=1260",
    ],
    "kyoto_traditional": [
        "https://images.pexels.com/photos/2506990/pexels-photo-2506990.jpeg?auto=compress&cs=tinysrgb&w=1260",
        "https://images.pexels.com/photos/2029731/pexels-photo-2029731.jpeg?auto=compress&cs=tinysrgb&w=1260",
        "https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg?auto=compress&cs=tinysrgb&w=1260",
    ],
    "bangkok_villa": [
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260",
        "https://images.pexels.com/photos/2507010/pexels-photo-2507010.jpeg?auto=compress&cs=tinysrgb&w=1260",
        "https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=1260",
    ],
    "chiang_mai_cottage": [
        "https://images.pexels.com/photos/2029694/pexels-photo-2029694.jpeg?auto=compress&cs=tinysrgb&w=1260",
        "https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg?auto=compress&cs=tinysrgb&w=1260",
        "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=1260",
    ],
    "seoul_loft": [
        "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260",
        "https://images.pexels.com/photos/3935333/pexels-photo-3935333.jpeg?auto=compress&cs=tinysrgb&w=1260",
        "https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=1260",
    ],
    "jeju_house": [
        "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1260",
        "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=1260",
        "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=1260",
    ],
    "jaipur_haveli": [
        "https://images.pexels.com/photos/2417842/pexels-photo-2417842.jpeg?auto=compress&cs=tinysrgb&w=1260",
        "https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=1260",
        "https://images.pexels.com/photos/2029698/pexels-photo-2029698.jpeg?auto=compress&cs=tinysrgb&w=1260",
    ],
    "goa_villa": [
        "https://images.pexels.com/photos/2507016/pexels-photo-2507016.jpeg?auto=compress&cs=tinysrgb&w=1260",
        "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260",
        "https://images.pexels.com/photos/2440471/pexels-photo-2440471.jpeg?auto=compress&cs=tinysrgb&w=1260",
    ],
    "bali_villa": [
        "https://images.pexels.com/photos/2373201/pexels-photo-2373201.jpeg?auto=compress&cs=tinysrgb&w=1260",
        "https://images.pexels.com/photos/3209049/pexels-photo-3209049.jpeg?auto=compress&cs=tinysrgb&w=1260",
        "https://images.pexels.com/photos/3754595/pexels-photo-3754595.jpeg?auto=compress&cs=tinysrgb&w=1260",
    ],
    "hanoi_studio": [
        "https://images.pexels.com/photos/3659683/pexels-photo-3659683.jpeg?auto=compress&cs=tinysrgb&w=1260",
        "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=1260",
        "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=1260",
    ],
    "galle_house": [
        "https://images.pexels.com/photos/2029670/pexels-photo-2029670.jpeg?auto=compress&cs=tinysrgb&w=1260",
        "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1260",
        "https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg?auto=compress&cs=tinysrgb&w=1260",
    ],
    "singapore_apartment": [
        "https://images.pexels.com/photos/1743227/pexels-photo-1743227.jpeg?auto=compress&cs=tinysrgb&w=1260",
        "https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=1260",
        "https://images.pexels.com/photos/2736139/pexels-photo-2736139.jpeg?auto=compress&cs=tinysrgb&w=1260",
    ],
    "kl_apartment": [
        "https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=1260",
        "https://images.pexels.com/photos/2029731/pexels-photo-2029731.jpeg?auto=compress&cs=tinysrgb&w=1260",
        "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260",
    ],
    "manila_loft": [
        "https://images.pexels.com/photos/3935350/pexels-photo-3935350.jpeg?auto=compress&cs=tinysrgb&w=1260",
        "https://images.pexels.com/photos/245208/pexels-photo-245208.jpeg?auto=compress&cs=tinysrgb&w=1260",
        "https://images.pexels.com/photos/3935320/pexels-photo-3935320.jpeg?auto=compress&cs=tinysrgb&w=1260",
    ],
    "hongkong_room": [
        "https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg?auto=compress&cs=tinysrgb&w=1260",
        "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260",
        "https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=1260",
    ],
    "samarkand_house": [
        "https://images.pexels.com/photos/2029722/pexels-photo-2029722.jpeg?auto=compress&cs=tinysrgb&w=1260",
        "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1260",
        "https://images.pexels.com/photos/2029669/pexels-photo-2029669.jpeg?auto=compress&cs=tinysrgb&w=1260",
    ],
}

def validate_url(url):
    """Check if URL returns a valid image response."""
    try:
        req = urllib.request.Request(url, method='HEAD')
        with urllib.request.urlopen(req, timeout=5) as resp:
            ct = resp.headers.get('Content-Type', '')
            return resp.status == 200 and 'image' in ct
    except:
        return False

def main():
    # Try Pexels API first if key is available
    pexels_key = os.environ.get('PEXELS_API_KEY', '')
    
    search_queries = {
        "tokyo_apartment": "modern japanese apartment interior bedroom",
        "kyoto_traditional": "traditional japanese room tatami interior",  
        "bangkok_villa": "luxury tropical villa bedroom interior",
        "chiang_mai_cottage": "rustic wooden cottage bedroom jungle",
        "seoul_loft": "modern loft apartment interior design",
        "jeju_house": "bright coastal house bedroom ocean view",
        "jaipur_haveli": "indian heritage hotel room ornate interior",
        "goa_villa": "tropical beach villa bedroom palm",
        "bali_villa": "bali villa open air bedroom pool",
        "hanoi_studio": "cozy studio apartment bedroom vintage",
        "galle_house": "colonial house bedroom tropical garden",
        "singapore_apartment": "luxury high rise apartment bedroom city view",
        "kl_apartment": "modern apartment bedroom city skyline",
        "manila_loft": "industrial loft apartment bedroom design",
        "hongkong_room": "premium hotel room bed city view night",
        "samarkand_house": "traditional central asian house interior ornate",
    }
    
    results = {}
    
    for key, query in search_queries.items():
        images = []
        
        # Try Pexels API
        if pexels_key:
            print(f"Searching Pexels for: {query}")
            api_results = search_pexels(query, pexels_key, per_page=4)
            images.extend(api_results)
        
        # Fallback to curated
        if len(images) < 3:
            print(f"Using curated images for: {key}")
            images = CURATED_IMAGES.get(key, [])
        
        results[key] = images[:4]  # Max 4 images per listing
    
    # Validate a sample
    print("\nValidating sample URLs...")
    for key in list(results.keys())[:3]:
        for url in results[key][:1]:
            ok = validate_url(url)
            print(f"  {key}: {'✅' if ok else '❌'} {url[:80]}...")
    
    # Output JSON
    output_path = os.path.join(os.path.dirname(__file__), 'scraped_images.json')
    with open(output_path, 'w') as f:
        json.dump(results, f, indent=2)
    
    print(f"\n✅ Saved {len(results)} sets of images to {output_path}")
    return results

if __name__ == "__main__":
    main()

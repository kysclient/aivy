"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Search, Star } from "lucide-react"

interface Product {
    id: string
    name: string
    price: number
    image: string
    rating: number
    category: string
    description: string
}

const mockProducts: Product[] = [
    {
        id: "1",
        name: "유기농 닭가슴살 1kg",
        price: 15900,
        image: "/placeholder-yv9ky.png",
        rating: 4.8,
        category: "육류",
        description: "신선한 국내산 유기농 닭가슴살로 고단백 저지방 식단에 완벽합니다.",
    },
    {
        id: "2",
        name: "프리미엄 연어 필렛",
        price: 28000,
        image: "/placeholder-jh77b.png",
        rating: 4.9,
        category: "수산물",
        description: "오메가3가 풍부한 노르웨이산 연어로 건강한 지방 공급원입니다.",
    },
    {
        id: "3",
        name: "국산 유기농 두부",
        price: 3500,
        image: "/organic-tofu.png",
        rating: 4.7,
        category: "두부/콩",
        description: "100% 국산 콩으로 만든 부드럽고 고소한 유기농 두부입니다.",
    },
    {
        id: "4",
        name: "유기농 퀴노아 500g",
        price: 12000,
        image: "/bowl-of-quinoa.png",
        rating: 4.6,
        category: "곡물",
        description: "완전 단백질을 함유한 슈퍼푸드 퀴노아입니다.",
    },
    {
        id: "5",
        name: "신선한 브로콜리",
        price: 4500,
        image: "/fresh-broccoli.png",
        rating: 4.5,
        category: "채소",
        description: "비타민과 미네랄이 풍부한 신선한 브로콜리입니다.",
    },
    {
        id: "6",
        name: "아보카도 4개입",
        price: 8900,
        image: "/ripe-avocado-halves.png",
        rating: 4.4,
        category: "과일",
        description: "건강한 지방과 영양소가 가득한 멕시코산 아보카도입니다.",
    },
]

const categories = ["전체", "육류", "수산물", "두부/콩", "곡물", "채소", "과일"]

export default function ProductsMain() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("전체")
    const [sortBy, setSortBy] = useState("rating")

    const filteredProducts = mockProducts
        .filter((product) => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesCategory = selectedCategory === "전체" || product.category === selectedCategory
            return matchesSearch && matchesCategory
        })
        .sort((a, b) => {
            if (sortBy === "rating") return b.rating - a.rating
            if (sortBy === "price-low") return a.price - b.price
            if (sortBy === "price-high") return b.price - a.price
            return 0
        })

    return (
        <div className="">
            <div className="space-y-4">
                {/* Search and Filters */}
                <Card className="bg-background rounded-xl border-0">
                    <CardContent className="">
                        <div className="flex flex-col md:flex-row gap-4 justify-end">
                  
                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger className="w-full md:w-40">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-full md:w-40">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="rating">평점순</SelectItem>
                                    <SelectItem value="price-low">가격 낮은순</SelectItem>
                                    <SelectItem value="price-high">가격 높은순</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Products Grid */}
                <div className="grid grid-cols-1 gap-4">
                    {filteredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="bg-background h-full rounded-none border-0 border-b border-border transition-shadow transition-colors hover:bg-muted  py-2">
                                <CardContent className="flex flex-row gap-4 itmes-center">
                                    <div className="aspect-square bg-muted rounded-xl overflow-hidden w-[160px] h-[210px] flex-shrink-0">
                                        <img
                                            src={product.image || "/placeholder.svg"}
                                            alt={product.name}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <div className="space-y-1 sm:space-y-3 flex flex-col justify-center flex-1">
                                        <Badge variant="outline" className="text-xs">
                                            {product.category}
                                        </Badge>
                                        <h3 className="font-semibold text-foreground">{product.name}</h3>
                                        <p className="text-sm text-description line-clamp-2">{product.description}</p>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm font-medium">{product.rating}</span>
                                            <span className="text-xs text-muted-foreground">(128)</span>
                                        </div>
                                        <div className="flex sm:items-center justify-between sm:flex-row flex-col gap-2">
                                            <span className="text-xl font-bold text-primary">{product.price.toLocaleString()}원</span>
                                            <Button size="sm" className="gap-2">
                                                <ShoppingCart className="w-4 h-4" />
                                                구매하기
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <Card className="text-center py-12">
                        <CardContent>
                            <p className="text-muted-foreground">검색 결과가 없습니다.</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}

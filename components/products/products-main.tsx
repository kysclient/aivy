"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Search, Star } from "lucide-react"
import Link from "next/link"

interface Product {
    id: string
    name: string
    price: number
    image: string
    rating: number
    category: string
    description: string
    href?: string
}

const mockProducts: Product[] = [
    {
        id: "1",
        name: "샐러드 포케 정기배송 2주 다이어트 식단 얌샐러드 구독 배달 야채 도시락 새벽 배송",
        price: 95020,
        image: "/poke-sample.jpg",
        rating: 4.0,
        category: "신선식품",
        description: "",
        href:'https://link.coupang.com/a/cTts7t'
    },
 
]

const categories = ["전체", "육류", "수산물", "두부/콩", "곡물", "채소", "과일", '신선식품']

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
                                            <Link href={product.href || '/'} target="__blank">
                                            <Button  size="sm" className="gap-2">
                                                <ShoppingCart className="w-4 h-4" />
                                                구매하기
                                            </Button>
                                            </Link>
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

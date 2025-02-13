"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Heart, Repeat2, Share } from "lucide-react"

export default function CommunityPage() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Alice",
      handle: "@alice_crypto",
      content: "Just bought some more BTC! #bullish",
      likes: 5,
      comments: 2,
      reposts: 1,
    },
    {
      id: 2,
      author: "Bob",
      handle: "@bob_trader",
      content: "What do you think about the latest Ethereum update? #ETH2",
      likes: 3,
      comments: 5,
      reposts: 2,
    },
    {
      id: 3,
      author: "Charlie",
      handle: "@charlie_analyst",
      content: "AI predictions showing bullish trends for ADA #Cardano",
      likes: 7,
      comments: 1,
      reposts: 3,
    },
  ])

  const [newPost, setNewPost] = useState("")

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPost.trim()) {
      setPosts([
        {
          id: posts.length + 1,
          author: "You",
          handle: "@your_handle",
          content: newPost,
          likes: 0,
          comments: 0,
          reposts: 0,
        },
        ...posts,
      ])
      setNewPost("")
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 pt-20">
      <h1 className="text-3xl font-bold mb-8">Crypto Community</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-8">
            <CardContent>
              <form onSubmit={handlePostSubmit} className="flex flex-col space-y-4 pt-6">
                <Input
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="What's happening in the crypto world?"
                  className="flex-grow"
                />
                <Button type="submit">Post</Button>
              </form>
            </CardContent>
          </Card>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Posts</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="space-y-4">
                {posts.map((post) => (
                  <Card key={post.id}>
                    <CardContent className="pt-6">
                      <div className="flex space-x-4">
                        <Avatar>
                          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${post.author}`} />
                          <AvatarFallback>{post.author[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                          <div className="flex items-center space-x-2">
                            <p className="font-semibold">{post.author}</p>
                            <p className="text-sm text-muted-foreground">{post.handle}</p>
                          </div>
                          <p className="mt-2">{post.content}</p>
                          <div className="mt-4 flex items-center space-x-6">
                            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                              <MessageCircle className="h-4 w-4" />
                              <span>{post.comments}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                              <Repeat2 className="h-4 w-4" />
                              <span>{post.reposts}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                              <Heart className="h-4 w-4" />
                              <span>{post.likes}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                              <Share className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="trending">
              <Card>
                <CardContent>
                  <p>Trending content will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="following">
              <Card>
                <CardContent>
                  <p>Posts from accounts you follow will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Who to Follow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["Crypto Expert", "Blockchain Dev", "NFT Enthusiast"].map((user, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user}`} />
                        <AvatarFallback>{user[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{user}</p>
                        <p className="text-sm text-muted-foreground">@{user.toLowerCase().replace(" ", "_")}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, Upload, Trash2, Plus, GripVertical, AlertTriangle, RefreshCw } from "lucide-react"
import Image from "next/image"
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"

export default function SettingsPage() {
  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Comic Reader",
    siteDescription: "Read your favorite comics and manga online",
    contactEmail: "admin@example.com",
  })

  // Footer Settings
  const [footerSettings, setFooterSettings] = useState({
    footerEmail: "contact@comicreader.com",
    footerLogo: "/vibrant-manga-display.png",
  })

  const [footerLinks, setFooterLinks] = useState([
    { id: "link1", text: "About Us", url: "/about" },
    { id: "link2", text: "Privacy Policy", url: "/privacy" },
    { id: "link3", text: "Terms of Service", url: "/terms" },
    { id: "link4", text: "Contact", url: "/contact" },
  ])

  // Slideshow Settings
  const [slideshowComics, setSlideshowComics] = useState([
    { id: "comic1", title: "Naruto", cover: "/naruto-cover.png", order: 1 },
    { id: "comic2", title: "One Piece", cover: "/one-piece-cover.png", order: 2 },
    { id: "comic3", title: "Bleach", cover: "/bleach-cover.png", order: 3 },
    { id: "comic4", title: "Attack on Titan", cover: "/attack-on-titan-cover.png", order: 4 },
  ])

  const [slideshowBackground, setSlideshowBackground] = useState("/vibrant-cityscape-night.png")

  // Background Settings
  const [backgrounds, setBackgrounds] = useState({
    loginBackground: "/glowing-anime-silhouette.png",
    registerBackground: "/anime-character-left.png",
  })

  // SEO Settings
  const [seoSettings, setSeoSettings] = useState({
    googleAnalyticsId: "UA-XXXXXXXXX-X",
    searchConsoleVerification: '<meta name="google-site-verification" content="XXXXXXXXXXXXXXXXXX" />',
    robotsTxt: "User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: https://example.com/sitemap.xml",
  })

  // Comment Settings
  const [commentSettings, setCommentSettings] = useState({
    enableComments: true,
    requireApproval: true,
    allowAnonymous: false,
    enableReporting: true,
    notifyOnNewComment: true,
  })

  // Storage Settings
  const [storageSettings, setStorageSettings] = useState({
    thumbnailPath: "/var/www/html/storage/thumbnails",
    uploadPath: "/var/www/html/storage/uploads",
    maxUploadSize: "10",
  })

  // Form handling
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")

  const handleSaveSettings = () => {
    setIsSaving(true)
    setSaveMessage("")

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setSaveMessage("Settings saved successfully!")
      // In a real app, this would send data to an API
      console.log("Settings saved")
    }, 1000)
  }

  // Footer links handling
  const addFooterLink = () => {
    const newId = `link${footerLinks.length + 1}`
    setFooterLinks([...footerLinks, { id: newId, text: "New Link", url: "/" }])
  }

  const updateFooterLink = (id, field, value) => {
    setFooterLinks(footerLinks.map((link) => (link.id === id ? { ...link, [field]: value } : link)))
  }

  const removeFooterLink = (id) => {
    setFooterLinks(footerLinks.filter((link) => link.id !== id))
  }

  // Drag and drop handling for footer links
  const handleFooterLinkDragEnd = (result) => {
    if (!result.destination) return

    const items = Array.from(footerLinks)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setFooterLinks(items)
  }

  // Drag and drop handling for slideshow comics
  const handleSlideshowDragEnd = (result) => {
    if (!result.destination) return

    const items = Array.from(slideshowComics)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update order property
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index + 1,
    }))

    setSlideshowComics(updatedItems)
  }

  // File upload handling (simulated)
  const handleFileUpload = (settingType, fileType) => {
    // In a real app, this would handle file uploads
    console.log(`Uploading ${fileType} for ${settingType}`)

    // Simulate successful upload with random image
    const dummyImages = ["/vibrant-manga-display.png", "/vibrant-cityscape-night.png", "/glowing-anime-silhouette.png"]

    const randomImage = dummyImages[Math.floor(Math.random() * dummyImages.length)]

    switch (settingType) {
      case "siteLogo":
        // Handle site logo upload
        break
      case "footerLogo":
        setFooterSettings({ ...footerSettings, footerLogo: randomImage })
        break
      case "slideshowBackground":
        setSlideshowBackground(randomImage)
        break
      case "loginBackground":
        setBackgrounds({ ...backgrounds, loginBackground: randomImage })
        break
      case "registerBackground":
        setBackgrounds({ ...backgrounds, registerBackground: randomImage })
        break
    }
  }

  return (
    <div className="space-y-6 bg-gray-700 text-white p-6 rounded-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Site Settings</h1>
        <div className="flex items-center gap-2">
          <Button onClick={handleSaveSettings} disabled={isSaving}>
            {isSaving ? (
              <>
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save All Settings
              </>
            )}
          </Button>
        </div>
      </div>

      {saveMessage && (
        <div className="bg-green-500/20 border border-green-500 text-green-500 px-4 py-2 rounded-md">{saveMessage}</div>
      )}

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-7 mb-4 bg-gray-800">
          <TabsTrigger value="general" className="data-[state=active]:bg-gray-600">
            General
          </TabsTrigger>
          <TabsTrigger value="footer" className="data-[state=active]:bg-gray-600">
            Footer
          </TabsTrigger>
          <TabsTrigger value="slideshow" className="data-[state=active]:bg-gray-600">
            Slideshow
          </TabsTrigger>
          <TabsTrigger value="backgrounds" className="data-[state=active]:bg-gray-600">
            Backgrounds
          </TabsTrigger>
          <TabsTrigger value="seo" className="data-[state=active]:bg-gray-600">
            SEO
          </TabsTrigger>
          <TabsTrigger value="comments" className="data-[state=active]:bg-gray-600">
            Comments
          </TabsTrigger>
          <TabsTrigger value="storage" className="data-[state=active]:bg-gray-600">
            Storage
          </TabsTrigger>
        </TabsList>

        {/* General Settings Tab */}
        <TabsContent value="general">
          <Card className="bg-gray-800 border-gray-600 text-white">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription className="text-gray-300">Configure basic site information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="siteName" className="text-white">
                  Site Name
                </Label>
                <Input
                  id="siteName"
                  value={generalSettings.siteName}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription" className="text-white">
                  Site Description
                </Label>
                <Textarea
                  id="siteDescription"
                  rows={3}
                  value={generalSettings.siteDescription}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail" className="text-white">
                  Contact Email
                </Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={generalSettings.contactEmail}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, contactEmail: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Site Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 bg-gray-700 rounded-md flex items-center justify-center overflow-hidden">
                    <Image
                      src="/vibrant-manga-display.png"
                      alt="Site Logo"
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <Button
                    onClick={() => handleFileUpload("siteLogo", "image")}
                    variant="outline"
                    size="sm"
                    className="bg-gray-600 text-white border-gray-500 hover:bg-gray-500 hover:text-white"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Logo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Footer Settings Tab */}
        <TabsContent value="footer">
          <Card className="bg-gray-800 border-gray-600 text-white">
            <CardHeader>
              <CardTitle>Footer Settings</CardTitle>
              <CardDescription className="text-gray-300">Configure the site footer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="footerEmail" className="text-white">
                  Footer Email
                </Label>
                <Input
                  id="footerEmail"
                  type="email"
                  value={footerSettings.footerEmail}
                  onChange={(e) => setFooterSettings({ ...footerSettings, footerEmail: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Footer Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 bg-gray-700 rounded-md flex items-center justify-center overflow-hidden">
                    <Image
                      src={footerSettings.footerLogo || "/placeholder.svg"}
                      alt="Footer Logo"
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <Button
                    onClick={() => handleFileUpload("footerLogo", "image")}
                    variant="outline"
                    size="sm"
                    className="bg-gray-600 text-white border-gray-500 hover:bg-gray-500 hover:text-white"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Logo
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-white">Footer Menu Links</Label>
                  <Button
                    onClick={addFooterLink}
                    variant="outline"
                    size="sm"
                    className="bg-gray-600 text-white border-gray-500 hover:bg-gray-500 hover:text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Link
                  </Button>
                </div>

                <DragDropContext onDragEnd={handleFooterLinkDragEnd}>
                  <Droppable droppableId="footer-links">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                        {footerLinks.map((link, index) => (
                          <Draggable key={link.id} draggableId={link.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="flex items-center gap-2 bg-gray-800 p-2 rounded-md"
                              >
                                <div {...provided.dragHandleProps} className="cursor-move">
                                  <GripVertical className="h-5 w-5 text-gray-400" />
                                </div>
                                <Input
                                  value={link.text}
                                  onChange={(e) => updateFooterLink(link.id, "text", e.target.value)}
                                  placeholder="Link Text"
                                  className="flex-1 bg-gray-700 border-gray-600 text-white"
                                />
                                <Input
                                  value={link.url}
                                  onChange={(e) => updateFooterLink(link.id, "url", e.target.value)}
                                  placeholder="URL"
                                  className="flex-1 bg-gray-700 border-gray-600 text-white"
                                />
                                <Button onClick={() => removeFooterLink(link.id)} variant="destructive" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Slideshow Settings Tab */}
        <TabsContent value="slideshow">
          <Card className="bg-gray-800 border-gray-600 text-white">
            <CardHeader>
              <CardTitle>Slideshow Settings</CardTitle>
              <CardDescription className="text-gray-300">Configure the homepage slideshow</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-white">Slideshow Background</Label>
                <div className="flex items-center gap-4">
                  <div className="h-24 w-40 bg-gray-700 rounded-md flex items-center justify-center overflow-hidden">
                    <Image
                      src={slideshowBackground || "/placeholder.svg"}
                      alt="Slideshow Background"
                      width={160}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <Button
                    onClick={() => handleFileUpload("slideshowBackground", "image")}
                    variant="outline"
                    size="sm"
                    className="bg-gray-600 text-white border-gray-500 hover:bg-gray-500 hover:text-white"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Background
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Featured Comics</Label>
                <p className="text-sm text-gray-300">Drag to reorder the comics in the slideshow</p>

                <DragDropContext onDragEnd={handleSlideshowDragEnd}>
                  <Droppable droppableId="slideshow-comics">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                        {slideshowComics.map((comic, index) => (
                          <Draggable key={comic.id} draggableId={comic.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="flex items-center gap-3 bg-gray-800 p-2 rounded-md"
                              >
                                <div {...provided.dragHandleProps} className="cursor-move">
                                  <GripVertical className="h-5 w-5 text-gray-400" />
                                </div>
                                <div className="h-16 w-12 bg-gray-700 rounded-md flex items-center justify-center overflow-hidden">
                                  <Image
                                    src={comic.cover || "/placeholder.svg"}
                                    alt={comic.title}
                                    width={48}
                                    height={64}
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium">{comic.title}</p>
                                  <p className="text-sm text-gray-300">Order: {comic.order}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-gray-600 text-white border-gray-500 hover:bg-gray-500 hover:text-white"
                                  >
                                    Edit
                                  </Button>
                                  <Button variant="destructive" size="icon">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>

                <Button
                  variant="outline"
                  className="w-full mt-2 bg-gray-600 text-white border-gray-500 hover:bg-gray-500 hover:text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Comic to Slideshow
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backgrounds Tab */}
        <TabsContent value="backgrounds">
          <Card className="bg-gray-800 border-gray-600 text-white">
            <CardHeader>
              <CardTitle>Background Settings</CardTitle>
              <CardDescription className="text-gray-300">Configure backgrounds for various pages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-white">Login Page Background</Label>
                <div className="flex items-center gap-4">
                  <div className="h-32 w-56 bg-gray-700 rounded-md flex items-center justify-center overflow-hidden">
                    <Image
                      src={backgrounds.loginBackground || "/placeholder.svg"}
                      alt="Login Background"
                      width={224}
                      height={128}
                      className="object-cover"
                    />
                  </div>
                  <Button
                    onClick={() => handleFileUpload("loginBackground", "image")}
                    variant="outline"
                    size="sm"
                    className="bg-gray-600 text-white border-gray-500 hover:bg-gray-500 hover:text-white"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Background
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Register Page Background</Label>
                <div className="flex items-center gap-4">
                  <div className="h-32 w-56 bg-gray-700 rounded-md flex items-center justify-center overflow-hidden">
                    <Image
                      src={backgrounds.registerBackground || "/placeholder.svg"}
                      alt="Register Background"
                      width={224}
                      height={128}
                      className="object-cover"
                    />
                  </div>
                  <Button
                    onClick={() => handleFileUpload("registerBackground", "image")}
                    variant="outline"
                    size="sm"
                    className="bg-gray-600 text-white border-gray-500 hover:bg-gray-500 hover:text-white"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Background
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO Settings Tab */}
        <TabsContent value="seo">
          <Card className="bg-gray-800 border-gray-600 text-white">
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription className="text-gray-300">Configure search engine optimization settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="googleAnalyticsId" className="text-white">
                  Google Analytics ID
                </Label>
                <Input
                  id="googleAnalyticsId"
                  value={seoSettings.googleAnalyticsId}
                  onChange={(e) => setSeoSettings({ ...seoSettings, googleAnalyticsId: e.target.value })}
                  placeholder="UA-XXXXXXXXX-X or G-XXXXXXXXXX"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="searchConsoleVerification" className="text-white">
                  Search Console Verification
                </Label>
                <Input
                  id="searchConsoleVerification"
                  value={seoSettings.searchConsoleVerification}
                  onChange={(e) => setSeoSettings({ ...seoSettings, searchConsoleVerification: e.target.value })}
                  placeholder="<meta name=google-site-verification content=XXXXXXXXXXXXXXXXXX />"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="robotsTxt" className="text-white">
                  robots.txt Content
                </Label>
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <p className="text-sm text-yellow-300">
                    Be careful when editing robots.txt as it can affect your site's indexing
                  </p>
                </div>
                <Textarea
                  id="robotsTxt"
                  rows={5}
                  value={seoSettings.robotsTxt}
                  onChange={(e) => setSeoSettings({ ...seoSettings, robotsTxt: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <Button
                variant="outline"
                className="bg-gray-600 text-white border-gray-500 hover:bg-gray-500 hover:text-white"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Generate Sitemap
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Comment Settings Tab */}
        <TabsContent value="comments">
          <Card className="bg-gray-800 border-gray-600 text-white">
            <CardHeader>
              <CardTitle>Comment Settings</CardTitle>
              <CardDescription className="text-gray-300">Configure how comments work on your site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableComments" className="text-white">
                    Enable Comments
                  </Label>
                  <p className="text-sm text-gray-300">Allow users to comment on comics and chapters</p>
                </div>
                <Switch
                  id="enableComments"
                  checked={commentSettings.enableComments}
                  onCheckedChange={(checked) => setCommentSettings({ ...commentSettings, enableComments: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="requireApproval" className="text-white">
                    Require Approval
                  </Label>
                  <p className="text-sm text-gray-300">New comments require admin approval before being published</p>
                </div>
                <Switch
                  id="requireApproval"
                  checked={commentSettings.requireApproval}
                  onCheckedChange={(checked) => setCommentSettings({ ...commentSettings, requireApproval: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="allowAnonymous" className="text-white">
                    Allow Anonymous Comments
                  </Label>
                  <p className="text-sm text-gray-300">Allow users to comment without logging in</p>
                </div>
                <Switch
                  id="allowAnonymous"
                  checked={commentSettings.allowAnonymous}
                  onCheckedChange={(checked) => setCommentSettings({ ...commentSettings, allowAnonymous: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableReporting" className="text-white">
                    Enable Comment Reporting
                  </Label>
                  <p className="text-sm text-gray-300">Allow users to report inappropriate comments</p>
                </div>
                <Switch
                  id="enableReporting"
                  checked={commentSettings.enableReporting}
                  onCheckedChange={(checked) => setCommentSettings({ ...commentSettings, enableReporting: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifyOnNewComment" className="text-white">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-gray-300">Receive email notifications for new comments</p>
                </div>
                <Switch
                  id="notifyOnNewComment"
                  checked={commentSettings.notifyOnNewComment}
                  onCheckedChange={(checked) => setCommentSettings({ ...commentSettings, notifyOnNewComment: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Storage Settings Tab */}
        <TabsContent value="storage">
          <Card className="bg-gray-800 border-gray-600 text-white">
            <CardHeader>
              <CardTitle>Storage Settings</CardTitle>
              <CardDescription className="text-gray-300">Configure file storage settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="thumbnailPath" className="text-white">
                  Thumbnail Storage Path
                </Label>
                <Input
                  id="thumbnailPath"
                  value={storageSettings.thumbnailPath}
                  readOnly
                  className="bg-gray-700 border-gray-600 text-white"
                />
                <p className="text-sm text-gray-300">This path is read-only and configured in the server settings</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="uploadPath" className="text-white">
                  Upload Storage Path
                </Label>
                <Input
                  id="uploadPath"
                  value={storageSettings.uploadPath}
                  readOnly
                  className="bg-gray-700 border-gray-600 text-white"
                />
                <p className="text-sm text-gray-300">This path is read-only and configured in the server settings</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxUploadSize" className="text-white">
                  Maximum Upload Size (MB)
                </Label>
                <Input
                  id="maxUploadSize"
                  type="number"
                  value={storageSettings.maxUploadSize}
                  onChange={(e) => setStorageSettings({ ...storageSettings, maxUploadSize: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

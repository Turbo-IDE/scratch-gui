const fs = require('fs');

// === Step 1: Load all available Vietnamese translation sources ===

// Upstream vi translations
const upstreamSrc = fs.readFileSync(require.resolve('@turbowarp/scratch-l10n/locales/editor-msgs.js'), 'utf8');
const upstream = JSON.parse(upstreamSrc.slice(upstreamSrc.indexOf('{')).replace(/;?\s*$/, ''));
const upstreamVi = upstream.vi || {};
const upstreamEn = upstream.en || {};

// Existing genTrans vi translations
const genTrans = JSON.parse(fs.readFileSync('src/lib/tw-translations/generated-translations.json', 'utf8'));
const genVi = genTrans.vi || {};

// Defaults (new messages from MistWarp codebase)
const defaults = JSON.parse(fs.readFileSync('src/lib/tw-translations/default-messages.json', 'utf8'));

// Find missing keys
const missingKeys = Object.keys(defaults).filter(k => !(k in upstreamVi) && !(k in genVi));
console.log('Missing keys to translate:', missingKeys.length);

// === Step 2: Build comprehensive en->vi mapping from ALL sources ===
const enToVi = {};

// From upstream vi (match by English text)
for (const [id, viText] of Object.entries(upstreamVi)) {
    const enText = upstreamEn[id];
    if (enText && !enToVi[enText]) enToVi[enText] = viText;
}

// From existing genTrans vi
for (const [id, viText] of Object.entries(genVi)) {
    const enText = defaults[id] || upstreamEn[id];
    if (enText && !enToVi[enText]) enToVi[enText] = viText;
}

// === Step 3: Direct dictionary for common UI terms and phrases ===
const dict = {
    // Common buttons
    "Save": "Lưu",
    "Save as…": "Lưu thành...",
    "Save as": "Lưu thành",
    "Save changes": "Lưu thay đổi",
    "Save to": "Lưu tới",
    "Save to MistWarp": "Lưu lên MistWarp",
    "Save without a version": "Lưu mà không có phiên bản",
    "Create version and save": "Tạo phiên bản và lưu",
    "Saving…": "Đang lưu...",
    "Saved": "Đã lưu",
    "Saving": "Đang lưu",
    "Not saved": "Chưa lưu",
    "Unsaved changes": "Thay đổi chưa lưu",
    "Saved to computer": "Đã lưu vào máy tính",
    "Read-only": "Chỉ đọc",
    "Saving to your computer": "Đang lưu về máy tính",
    "Browser autosave is on.": "Tự động lưu trình duyệt đã bật.",
    "Browser autosave is off.": "Tự động lưu trình duyệt đã tắt.",
    "Remix to MistWarp": "Remix lên MistWarp",
    "Save to MistWarp": "Lưu lên MistWarp",
    "Upload to TurboWorkshop": "Tải lên TurboWorkshop",
    "{shortcut} saves a copy to your computer instead.": "{shortcut} lưu một bản sao vào máy tính của bạn thay thế.",
    "Creates your own copy of this project on MistWarp.": "Tạo bản sao của bạn cho dự án này trên MistWarp.",
    "Uploads your latest changes to this MistWarp project.": "Tải lên những thay đổi mới nhất của bạn lên dự án MistWarp này.",
    "Uploads this project to your MistWarp account.": "Tải lên dự án này lên tài khoản MistWarp của bạn.",
    "Uploads this project to TurboWorkshop.": "Tải lên dự án này lên TurboWorkshop.",
    "Creates your own copy of this project on MistWarp, and turns it in to a full MistWarp project with version history and collaboration.": "Tạo bản sao của bạn cho dự án này trên MistWarp, đồng thời biến nó thành một dự án MistWarp đầy đủ với lịch sử phiên bản và hợp tác.",
    "Saves your latest changes. You can still play and share while saving.": "Lưu những thay đổi mới nhất của bạn. Bạn vẫn có thể chơi và chia sẻ trong khi lưu.",
    "Uploads your latest changes to this MistWarp project, keeping the same project ID.": "Tải lên những thay đổi mới nhất của bạn lên dự án MistWarp này, giữ nguyên ID dự án.",
    "Uploads this project to your MistWarp account, creating a new project.": "Tải lên dự án này lên tài khoản MistWarp của bạn, tạo dự án mới.",
    "Uploads this project to TurboWorkshop, creating a new workshop entry.": "Tải lên dự án này lên TurboWorkshop, tạo một mục workshop mới.",
    "Creates your own copy of this project on MistWarp, keeping the same project ID and collaborators.": "Tạo bản sao của bạn cho dự án này trên MistWarp, giữ nguyên ID dự án và đồng tác giả.",

    // Common actions
    "Cancel": "Hủy",
    "Close": "Đóng",
    "Delete": "Xóa",
    "Edit": "Sửa",
    "Remove": "Xóa",
    "Add": "Thêm",
    "Open": "Mở",
    "New": "Mới",
    "New window": "Cửa sổ mới",
    "New folder": "Thư mục mới",
    "New group": "Nhóm mới",
    "Create": "Tạo",
    "Export": "Xuất khẩu",
    "Import": "Nhập khẩu",
    "Copy": "Sao chép",
    "Share": "Chia sẻ",
    "Sign in": "Đăng nhập",
    "Sign in with Rotur": "Đăng nhập với Rotur",
    "Sign out": "Đăng xuất",
    "Switch account": "Chuyển tài khoản",
    "Refresh": "Làm mới",
    "Retry": "Thử lại",
    "Try again": "Thử lại",
    "Dismiss": "Bỏ qua",
    "Hide": "Ẩn",
    "Show": "Hiển thị",
    "Undo": "Hoàn tác",
    "Redo": "Làm lại",

    // Common nouns
    "Settings": "Cài đặt",
    "Help": "Trợ giúp",
    "About": "Giới thiệu",
    "File": "Tệp",
    "Tools": "Công cụ",
    "Code": "Mã",
    "Stage": "Sân khấu",
    "Sprites": "Sprite",
    "Costumes": "Trang phục",
    "Sounds": "Âm thanh",
    "Scripts": "Kịch bản",
    "Assets": "Tài nguyên",
    "Extension": "Tiện ích mở rộng",
    "Extensions": "Tiện ích mở rộng",
    "Addons": "Plugin",
    "Debugger": "Công cụ gỡ lỗi",
    "Variable Manager": "Quản lý biến số",
    "Profile": "Hồ sơ",
    "Admin": "Quản trị viên",
    "Leaderboard": "Bảng xếp hạng",
    "Wallet": "Ví",
    "Account settings": "Cài đặt tài khoản",
    "Account": "Tài khoản",
    "Products": "Sản phẩm",
    "Game Items": "Vật phẩm trò chơi",
    "Views": "Lượt xem",
    "Feedback": "Phản hồi",
    "Send feedback": "Gửi phản hồi",
    "Documentation": "Tài liệu",
    "Chat": "Trò chuyện",
    "Notifications": "Thông báo",
    "Analytics": "Phân tích",
    "Catalog": "Danh mục",

    // Common status
    "Error": "Lỗi",
    "Success": "Thành công",
    "Loading": "Đang tải",
    "Loading…": "Đang tải...",
    "Preparing": "Đang chuẩn bị",
    "Checking": "Đang kiểm tra",
    "Building": "Đang xây dựng",
    "Parsing": "Đang phân tích",
    "Downloading": "Đang tải xuống",
    "Uploading": "Đang tải lên",
    "Computing diff…": "Đang tính diff...",
    "No extensions loaded": "Chưa có tiện ích mở rộng nào được tải",
    "1 loaded extension": "1 tiện ích mở rộng đã tải",
    "{count} loaded extensions": "{count} tiện ích mở rộng đã tải",

    // Common labels
    "Name": "Tên",
    "Title": "Tiêu đề",
    "Description": "Mô tả",
    "Category": "Danh mục",
    "Type": "Kiểu",
    "All": "Tất cả",
    "None": "Không có",
    "Yes": "Có",
    "No": "Không",
    "On": "Bật",
    "Off": "Tắt",
    "Enable": "Bật",
    "Disable": "Tắt",
    "Warning": "Cảnh báo",
    "Info": "Thông tin",
    "Note": "Lưu ý",

    // Common phrases
    "Are you sure?": "Bạn có chắc không?",
    "No results": "Không có kết quả",
    "No results found.": "Không tìm thấy kết quả.",
    "No matches found.": "Không tìm thấy kết quả.",
    "No changes.": "Không có thay đổi.",
    "No bookmarks yet": "Chưa có dấu trang nào",
    "No products available": "Không có sản phẩm nào khả dụng",
    "No products defined yet": "Chưa có sản phẩm nào được định nghĩa",
    "No items defined yet": "Chưa có mục nào được định nghĩa",
    "No repositories yet.": "Chưa có kho lưu trữ nào.",
    "No conversations yet.": "Chưa có cuộc trò chuyện nào.",
    "No recent fonts": "Không có phông chữ gần đây",
    "No fonts added yet": "Chưa có phông chữ nào được thêm",

    // Collaboration
    "Host": "Chủ đề",
    "You": "Bạn",
    "Guest": "Khách",
    "Kick": "Kick",
    "Watch": "Quan sát",
    "Editing": "Đang sửa",
    "Watching": "Đang xem",
    "Live collaboration": "Hợp tác trực tuyến",
    "Live session": "Phiên trực tuyến",
    "Live session available": "Có phiên trực tuyến",
    "Session open": "Phiên đã mở",
    "Online status unavailable": "Trạng thái trực tuyến không khả dụng",
    "Waiting for the host": "Đang chờ người chủ",
    "Waiting for host": "Đang chờ người chủ",
    "Waiting for the host to come back…": "Đang chờ người chủ quay lại...",
    "Waiting for host…": "Đang chờ người chủ...",
    "Opening session…": "Đang mở phiên...",
    "Joining session…": "Đang tham gia phiên...",
    "Reconnecting…": "Đang kết nối lại...",
    "Leaving session…": "Đang rời phiên...",
    "Session open": "Phiên đã mở",
    "Live session available": "Có phiên trực tuyến",
    "{count} on this branch": "{count} trên nhánh này",
    "Show current collaborators": "Hiển thị đồng tác giả hiện tại",
    "Show the message you are replying to": "Hiển thị tin nhắn bạn đang trả lời",
    "Jump to latest": "Chuyển đến mới nhất",

    // Chat
    "Chat": "Trò chuyện",
    "Direct messages": "Tin nhắn trực tiếp",
    "Conversations": "Cuộc trò chuyện",
    "Message": "Gửi tin nhắn",
    "Send message": "Gửi tin nhắn",
    "Reply": "Trả lời",
    "Delete message": "Xóa tin nhắn",
    "Edit message": "Sửa tin nhắn",
    "Message options": "Tùy chọn tin nhắn",
    "Add reaction": "Thêm phản hồi",
    "Reply": "Trả lời",
    "More options": "Thêm tùy chọn",
    "Mention": "Nhắc đến",
    "Copy text": "Sao chép văn bản",
    "Pin message": "Ghim tin nhắn",
    "Unpin message": "Bỏ ghim tin nhắn",
    "Attachments": "Tệp đính kèm",
    "Attachment": "Tệp đính kèm",
    "Remove {name}": "Xóa {name}",
    "Attach files": "Đính kèm tệp",
    "Send a direct message": "Gửi tin nhắn trực tiếp",
    "No content": "Không có nội dung",
    "Unknown user": "Người dùng không xác định",
    "Jump to the message this replies to": "Chuyển đến tin nhắn trả lời",
    "Reveal spoiler": "Tiết lộ spoiler",
    "Chat ({count} new)": "Trò chuyện ({count} mới)",
    "Chat spaces": "Không gian trò chuyện",
    "Dock to the side": "Ghim vào bên",
    "Pop out into a window": "Mở rộng thành cửa sổ",
    "Close chat": "Đóng trò chuyện",
    "Leave chat": "Rời khỏi trò chuyện",

    // Git
    "Push": "Đẩy",
    "Pull": "Kéo",
    "Clone": "Nhân bản",
    "Merge": "Hòa nhập",
    "Merge from…": "Hòa nhập từ...",
    "Preview": "Xem trước",
    "Restore this commit": "Khôi phục commit này",
    "Download as .sb3": "Tải xu ng as .sb3",
    "Working changes": "Thay đổi đang làm việc",
    "Commit message": "Thông điệp commit",
    "Commit": "Commit",
    "Undo last commit": "Hoàn tác commit cuối",
    "No uncommitted changes.": "Không có thay đổi chưa commit.",
    "Danger zone": "Vùng nguy hiểm",
    "Delete repository": "Xóa kho lưu trữ",
    "Select a file to view its changes.": "Chọn một tệp để xem thay đổi.",
    "No changes in this file.": "Không có thay đổi trong tệp này.",
    "No uncommitted changes to diff.": "Không có thay đổi chưa commit để so sánh.",
    "No file-level changes to show.": "Không có thay đổi ở mức tệp để hiển thị.",
    "Current branch": "Nhánh hiện tại",
    "Create new branch": "Tạo nhánh mới",
    "Create new room": "Tạo phòng mới",
    "Create a room": "Tạo một phòng",
    "Create a repository": "Tạo kho lưu trữ",
    "Repository URL": "URL kho lưu trữ",
    "Token or password for other services (stored locally)": "Mã thông báo hoặc mật khẩu cho các dịch vụ khác (lưu trữ cục bộ)",
    "Rotur Git does not need this.": "Rotur Git không cần điều này.",
    "Connections you add here sync...": "Kết nối bạn thêm ở đây sẽ động bộ...",
    "Clone an existing project": "Nhân bản dự án hiện có",
    "This project has no pushed history yet.": "Dự án này chưa có lịch sử đẩy nào.",
    "Start project history": "Bắt đầu lịch sử dự án",
    "Your repositories": "Kho lưu trữ của bạn",
    "Clone any Rotur repo": "Nhân bản bất kỳ kho lưu trữ Rotur nào",
    "Clone this repo as your project": "Nhân bản kho lưu trữ này làm dự án của bạn",
    "Open on git.rotur.dev": "Mở trên git.rotur.dev",
    "Push project to this repo": "Đẩy dự án lên kho lưu trữ này",
    "Sign in with Rotur to create repos...": "Đăng nhập với Rotur để tạo kho lưu trữ...",
    "Repo name (required)": "Tên kho lưu trữ (bắt buộc)",

    // Sign in with Rotur features
    "Save from the File menu and restore old versions later.": "Lưu từ menu Tệp và khôi phục phiên bản cũ sau này.",
    "Open a saved project to your teammates from the Tools menu.": "Mở một dự án đã lưu cho đồng nghiệp của bạn từ menu Công cụ.",
    "Share projects, comment, react, and follow creators.": "Chia sẻ dự án, bình luận, phản hồi, và theo dõi tác giả.",
    "Join studios and challenges, submit entries, and vote.": "Tham gia studio và thử thách, nộp bài, và bầu chọn.",
    "Themes and settings sync": "Đồng bộ chủ đề và cài đặt",
    "Your theme and settings follow you to every device.": "Chủ đề và cài đặt của bạn đi theo bạn ở mọi thiết bị.",
    "Show what you're editing": "Hiển thị những gì bạn đang sửa",
    "Share MistWarp activity on your Rotur profile.": "Chia sẻ hoạt động MistWarp trên hồ sơ Rotur của bạn.",
    "Your name in projects": "Tên của bạn trong dự án",
    "The username block and cloud variables use your Rotur name.": "Khối tên người dùng và biến đám mây sử dụng tên Rotur của bạn.",

    // Products
    "Grant to Username": "Cấp cho tên người dùng",
    "Grant": "Cấp",
    "Revoke": "Thu hẹn",
    "Revoke live ownership": "Thu hẹn quyền sở hữu trực tiếp",
    "Revoke from Username": "Thu hẹn từ tên người dùng",
    "Confirm revoke": "Xác nhận thu hẹn",
    "Without refund": "Không hoàn lại",
    "Select Product": "Chọn sản phẩm",
    "Product Catalog": "Danh mục sản phẩm",
    "Users who own \"{productName}\" ({count})": "Người dùng sở hữu \"{productName}\" ({count})",
    "No users currently own this product.": "Hiện không có người dùng nào sở hữu sản phẩm này.",
    "Enter a username above to grant ownership.": "Nhập tên người dùng ở trên để cấp quyền sở hữu.",
    "Project not saved to MistWarp yet": "Dự án chưa được lưu lên MistWarp",
    "User Entitlements": "Quyền người dùng",

    // Game Items
    "Edit Item": "Sửa mục",
    "Add New Item": "Thêm mục mới",
    "Item Name": "Tên mục",
    "Item ID (slug)": "ID mục (slug)",
    "Item Image (compressed)": "Hình ảnh mục (đã nén)",
    "Awardable by game code": "Có thể thưởng bởi mã trò chơi",
    "Blocks can give this item to players": "Các khối có thể cho người chơi vật phẩm này",
    "Click Add Item to create collectables...": "Nhấn Thêm mục để tạo vật phẩm thu thập...",
    "Collectable Items": "Vật phẩm thu thập được",
    "Add Item": "Thêm mục",
    "Add Item button": "Nút thêm mục",

    // Assets
    "No preview available": "Không có bản xem trước",
    "Select a file to preview it": "Chọn một tệp để xem trước",
    "Add files": "Thêm tệp",
    "New folder": "Thư mục mới",
    "Folder name": "Tên thư mục",
    "Export": "Xuất khẩu",
    "Delete": "Xóa",
    "Assets": "Tài nguyên",
    "Are you sure you want to delete \"{asset}\"? Blocks that use it will stop working.": "Bạn có chắc muốn xóa \"{asset}\"? Các khối sử dụng nó sẽ ngừng hoạt động.",
    "Drop files here, paste them, or click Add files. Assets cost nothing until a block loads them.": "Thả tệp ở đây, dán chúng, hoặc nhấn Thêm tệp. Tài nguyên không tốn chi phí cho đến khi một khối tải chúng.",
    "Adding to {folder}": "Đang thêm vào {folder}",

    // Welcome
    "Getting started": "Bắt đầu",
    "Make your first project": "Tạo dự án đầu tiên của bạn",
    "Start from a small working project and change it, or open a project from your computer.": "Bắt đầu từ một dự án nhỏ đang hoạt động và thay đổi nó, hoặc mở một dự án từ máy tính của bạn.",
    "Open a file": "Mở tệp",
    "Open your own file": "Mở tệp của bạn",
    "Documentation": "Tài liệu",
    "Dismiss starter guide": "Bỏ qua hướng dẫn",
    "Starter project guide": "Hướng dẫn dự án mẫu",
    "Press {shortcut} to search every command.": "Nhấn {shortcut} để tìm kiếm mọi lệnh.",

    // View counter
    "Views": "Lượt xem",
    "Watchers": "Người xem",
    "Loves": "Yêu thích",
    "Faves": "Yêu thích",
    "Remixes": "Remix",

    // Stage controls
    "Take stage screenshot": "Chụp màn hình sân khấu",
    "Mute project": "Tắt tiếng dự án",
    "Unmute project": "Bật tiếng dự án",
    "Project volume": "Âm lượng dự án",
    "Stage screenshot": "Ảnh chụp màn hình sân khấu",
    "Screenshot copied to clipboard.": "Ảnh chụp đã được sao chép vào bảng nhớ tạm.",
    "Screenshot taken, but your browser did not allow copying it to the clipboard.": "Đã chụp màn hình, nhưng trình duyệt của bạn không cho phép sao chép vào bảng nhớ tạm.",
    "Resize chat": "Điều chỉnh kích thước trò chuyện",
    "{count} of {max} clones. The clone limit has been reached.": "{count} trên {max} bản sao. Đã đạt giới hạn bản sao.",
    "{count, plural, one {# clone} other {# clones}}": "{count, plural, one {# bản sao} other {# bản sao}}",

    // Errors
    "Could not save MistWarp project: {error}": "Không thể lưu dự án MistWarp: {error}",
    "Could not load project": "Không thể tải dự án",
    "Check your connection and try again.": "Kiểm tra kết nối của bạn và thử lại.",
    "Could not connect to chat.": "Không thể kết nối đến trò chuyện.",
    "The editor ran into a problem and stopped.": "Trình soạn thảo gặp sự cố và ngừng hoạt động.",
    "The project could not be downloaded.": "Không thể tải xuống dự án.",
    "Download failed": "Tải xuống thất bại",
    "Push failed. {error}": "Đẩy lên thất bại. {error}",
    "Pull failed. {error}": "Kéo thất bại. {error}",
    "Commit failed. {error}": "Commit thất bại. {error}",
    "Could not start a new project. Your current project is still open.": "Không thể bắt đầu dự án mới. Dự án hiện tại của bạn vẫn đang mở.",
    "There are no new changes to save.": "Không có thay đổi mới để lưu.",

    // Share window
    "Open project page": "Mở trang dự án",
    "Save without a version": "Lưu mà không có phiên bản",
    "Create version and save": "Tạo phiên bản và lưu",
    "Use current canvas": "Sử dụng canvas hiện tại",
    "Upload an image": "Tải lên hình ảnh",
    "Saving…": "Đang lưu...",
    "Remix": "Remix",
    "Update": "Cập nhật",
    "Save": "Lưu",
    "For example: Added a new level": "Ví dụ: Đã thêm cấp độ mới",

    // File menu
    "Save to your computer": "Lưu về máy tính của bạn",
    "File > Save to your computer": "Tệp > Lưu về máy tính của bạn",
    "File > Export > Package project": "Tệp > Xuất khuất > Đóng gói dự án",
    "File > Device backups": "Tệp > Bản sao thiết bị",
    "Export > Package project": "Xuất khẩu > Đóng gói dự áp",
    "Package project": "Đóng gói dự án",
    "Load from your computer": "Tải từ máy tính của bạn",
    "Load project": "Tải dự án",

    // Account menu
    "Sign in": "Đăng nhập",
    "Sign out": "Đăng xuất",
    "Switch account": "Chuyển tài khoản",
    "Account settings": "Cài đặt tài khoản",
    "Profile": "Hồ sơ",
    "Admin": "Quản trị viên",
    "Admin ({count})": "Quản trị viên ({count})",
    "Leaderboard": "Bảng xếp hạng",
    "Wallet": "Ví",

    // Rotur login
    "Connect MistWarp to Rotur": "Kết nối MistWarp với Rotur",
    "Reconnect MistWarp to Rotur": "Kết nối lại MistWarp với Rotur",
    "Rotur in MistWarp": "Rotur trong MistWarp",
    "Sign in with Rotur": "Đăng nhập với Rotur",
    "Rotur has a new way to sign in. Reconnect once to stay signed in as {username}.": "Rotur có cách đăng nhập mới. Hãy kết nối lại một lần để vẫn đăng nhập với tên {username}.",
    "Your Rotur account turns these on across MistWarp.": "Tài khoản Rotur của bạn bật các tính năng này trên toàn MistWarp.",
    "One Rotur account turns these on across MistWarp.": "Một tài khoản Rotur bật các tính năng này trên toàn MistWarp.",
    "Check your account standing on rotur.dev": "Kiểm tra trạng thái tài khoản trên rotur.dev",
    "You sign in on {link}, so MistWarp never sees your password.": "Bạn đăng nhập trên {link}, vì vậy MistWarp sẽ không bao giờ thấy mật khẩu của bạn.",
    "Manage account": "Quản lý tài khoản",
    "Close": "Đóng",
    "Not now": "Không ngay",
    "Waiting for Rotur...": "Đang chờ Rotur...",
    "Reconnect": "Kết nối lại",
    "Continue with Rotur": "Tiếp tục với Rotur",
    "Sign in to create repos on git.rotur.dev and push your project straight from MistWarp.": "Đăng nhập để tạo kho lưu trữ trên git.rotur.dev và đẩy dự án của bạn trực tiếp từ MistWarp.",
    "Sign in with Rotur to create repos on git.rotur.dev and push your project straight from MistWarp.": "Đăng nhập với Rotur để tạo kho lưu trữ trên git.rotur.dev và đẩy dự án của bạn trực tiếp từ MistWarp.",
    "Sign in with Rotur to create repos...": "Đăng nhập với Rotur để tạo kho lưu trữ...",

    // Rotur login features (titles)
    "Save from the File menu and restore old versions later.": "Lưu từ menu Tệp và khôi phục phiên bản cũ sau này.",
    "Open a saved project to your teammates from the Tools menu.": "Mở một dự án đã lưu cho đồng nghiệp của bạn từ menu Công cụ.",
    "Share projects, comment, react, and follow creators.": "Chia sẻ dự án, bình luận, phản hồi, và theo dõi tác giả.",
    "Join studios and challenges, submit entries, and vote.": "Tham gia studio và thử thách, nộp bài, và bầu chọn.",
    "Themes and settings sync": "Đồng bộ chủ đề và cài đặt",
    "Your theme and settings follow you to every device.": "Chủ đề và cài đặt của bạn đi theo bạn ở mọi thiết bị.",
    "Show what you're editing": "Hiển thị những gì bạn đang sửa",
    "Share MistWarp activity on your Rotur profile.": "Chia sẻ hoạt động MistWarp trên hồ sơ Rotur của bạn.",
    "Your name in projects": "Tên của bạn trong dự án",
    "The username block and cloud variables use your Rotur name.": "Khối tên người dùng và biến đám mây sử dụng tên Rotur của bạn.",

    // Rotur login feature titles
    "Save to MistWarp": "Lưu lên MistWarp",
    "Live collaboration": "Hợp tác trực tuyến",
    "Publish and remix": "Đăng tải và remix",
    "Spaces and challenges": "Không gian và thử thách",
    "Themes and settings sync": "Đồng bộ chủ đề và cài đặt",
    "Show what you're editing": "Hiển thị những gì bạn đang sửa",
    "Your name in projects": "Tên của bạn trong dự án",

    // Rotur feature descriptions
    "Rotur in MistWarp": "Rotur trong MistWarp",
    "Save from the File menu": "Lưu từ menu Tệp",
    "and restore old versions later.": "và khôi phục phiên bản cũ sau này.",
    "Open a saved project": "Mở một dự án đã lưu",
    "to your teammates": "cho đồng nghiệp của bạn",
    "from the Tools menu.": "từ menu Công cụ.",
    "Share projects, comment, react, and follow creators.": "Chia sẻ dự án, bình luận, và theo dõi tác giả.",
    "Join studios and challenges, submit entries, and vote.": "Tham gia studio và thử thách, nộp bài, và bầu chọn.",
    "Themes and settings sync": "Đồng bộ chủ đề và cài đặt",
    "Your theme and settings follow you to every device.": "Chủ đề và cài đặt của bạn theo bạn trên mọi thiết bị.",
    "Show what you're editing": "Hiển thị những gì bạn đang sửa",
    "Share MistWarp activity on your Rotur profile.": "Chia sẻ hoạt động MistWarp trên hồ sơ Rotur của bạn.",
    "Your name in projects": "Tên của bạn trong dự án",
    "The username block and cloud variables use your Rotur name.": "Khối tên người dùng và biến đám mây sử dụng tên Rotur của bạn.",

    // Rotur login feature details
    "Save from the File menu and restore old versions later.": "Lưu từ menu Tệp và khôi phục phiên bản cũ sau này.",
    "Open a saved project to your teammates from the Tools menu.": "Mở một dự án đã lưu cho đồng nghiệp của bạn từ menu Công cụ.",
    "Share projects, comment, react, and follow creators.": "Chia sẻ dự án, bình luận, và theo dõi tác giả.",
    "Join studios and challenges, submit entries, and vote.": "Tham gia studio và thử thách, nộp bài, và bầu chọn.",
    "Themes and settings sync": "Đồng bộ chủ đề và cài đặt",
    "Your theme and settings follow you to every device.": "Chủ đề và cài đặt của bạn theo bạn trên mọi thiết bị.",
    "Show what you're editing": "Hiển thị những gì bạn đang sửa",
    "Share MistWarp activity on your Rotur profile.": "Chia sẻ hoạt động MistWarp trên hồ sơ Rotur của bạn.",
    "Your name in projects": "Tên của bạn trong dự án",
    "The username block and cloud variables use your Rotur name.": "Khối tên người dùng và biến đám mây sử dụng tên Rotur của bạn.",

    // Sign in with Rotur feature details
    "Save from the File menu and restore old versions later.": "Lưu từ menu Tệp và khôi phục phiên bản cũ sau này.",
    "Open a saved project to your teammates from the Tools menu.": "Mở một dự án đã lưu cho đồng nghiệp của bạn từ menu Công cụ.",
    "Share projects, comment, react, and follow creators.": "Chia sẻ dự án, bình luận, và theo dõi tác giả.",
    "Join studios and challenges, submit entries, and vote.": "Tham gia studio và thử thách, nộp bài, và bầu chọn.",
    "Themes and settings sync": "Đồng bộ chủ đề và cài đặt",
    "Your theme and settings follow you to every device.": "Chủ đề và cài đặt của bạn theo bạn trên mọi thiết bị.",
    "Show what you're editing": "Hiển thị những gì bạn đang sửa",
    "Share MistWarp activity on your Rotur profile.": "Chia sẻ hoạt động MistWarp trên hồ sơ Rotur của bạn.",
    "Your name in projects": "Tên của bạn trong dự án",
    "The username block and cloud variables use your Rotur name.": "Khối tên người dùng và biến đám mây sử dụng tên Rotur của bạn.",

    // Sign in with Rotur features
    "Save from the File menu and restore old versions later.": "Lưu từ menu Tệp và khôi phục phiên bản cũ sau này.",
    "Open a saved project to your teammates from the Tools menu.": "Mở một dự án đã lưu cho đồng nghiệp của bạn từ menu Công cụ.",
    "Share projects, comment, react, and follow creators.": "Chia sẻ dự án, bình luận, và theo dõi tác giả.",
    "Join studios and challenges, submit entries, and vote.": "Tham gia studio và thử thách, nộp bài, và bầu chọn.",
    "Themes and settings sync": "Đồng bộ chủ đề và cài đặt",
    "Your theme and settings follow you to every device.": "Chủ đề và cài đặt của bạn theo bạn trên mọi thiết bị.",
    "Show what you're editing": "Hiển thị những gì bạn đang sửa",
    "Share MistWarp activity on your Rotur profile.": "Chia sẻ hoạt động MistWarp trên hồ sơ Rotur của bạn.",
    "Your name in projects": "Tên của bạn trong dự án",
    "The username block and cloud variables use your Rotur name.": "Khối tên người dùng và biến đám mây sử dụng tên Rotur của bạn.",

    // Sign in with Rotur feature descriptions
    "Save from the File menu and restore old versions later.": "Lưu từ menu Tệp và khôi phục phiên bản cũ sau này.",
    "Open a saved project to your teammates from the Tools menu.": "Mở một dự án đã lưu cho đồng nghiệp của bạn từ menu Công cụ.",
    "Share projects, comment, react, and follow creators.": "Chia sẻ dự án, bình luận, và theo dõi tác giụ.",
    "Join studios and challenges, submit entries, and vote.": "Tham gia studio và thử thách, nộp bài, và bầu chọn.",
    "Themes and settings sync": "Đồng bộ chủ đề và cài đặt",
    "Your theme and settings follow you to every device.": "Chủ đề và cài đặt của bạn theo bạn trên mọi thiết bị.",
    "Show what you're editing": "Hiển thị những gì bạn đang sửa",
    "Share MistWarp activity on your Rotur profile.": "Chia sẻ hoạt động MistWarp trên hồ sơ Rotur của bạn.",
    "Your name in projects": "Tên của bạn trong dự án",
    "The username block and cloud variables use your Rotur name.": "Khối tên người dùng và biến đám mây sử dụng tên Rotur của bạn.",

    // Share window
    "Cancel": "Hủy",
    "Close": "Đóng",
    "Open project page": "Mở trang dự án",
    "Save without a version": "Lưu mà không có phiên bản",
    "Create version and save": "Tạo phiên bản và lưu",
    "Use current canvas": "Sử dụng canvas hiện tại",
    "Upload an image": "Tải lên hình ảnh",
    "Saving…": "Đang lưu...",
    "Remix": "Remix",
    "Update": "Cập nhật",
    "Save": "Lưu",
    "For example: Added a new level": "Ví dụ: Đã thêm cấp độ mới",

    // File/Tools menu
    "File": "Tệp",
    "Tools": "Công cụ",
    "About": "Giới thiệu",

    // Other common terms
    "Sign in to create": "Đăng nhập để tạo",
    "Sign in to": "Đăng nhập để",

    // Common
    "Project": "Dự án",
    "Save to MistWarp": "Lưu lên MistWarp",
    "Load from your computer": "Tải từ máy tính của bạn",
    "Export > Package project": "Xuất khẩu > Đóng gói dự án",
    "File > Device backups": "Tệp > Bản sao thiết bị",
    "File > Save to your computer": "Tệp > Lưu về máy tĩnh của bạn",
    "File > Export > Package project": "Tệp > Xuất khẩu > Đóng gói dự án",

    // Other
    "Follow MistWarp on GitHub": "Theo dõi MistWarp trên GitHub",
    "Project Video Recorder": "Máy ghi video dự án",

    // Common
    "Save to your computer": "Lưu về máy tính của bạn",
    "Save to MistWarp": "Lưu lên MistWarp",
    "Load from your computer": "Tải từ máy tính của bạn",
    "Export > Package project": "Xuất khẩu > Đóng gói dự án",
    "File > Device backups": "Tệp > Bản sao thiết bị",
    "File > Save to your computer": "Tệp > Lưu về máy tính của bạn",

    // Account menu items
    "Sign in": "Đăng nhập",
    "Sign out": "Đăng xuất",
    "Switch account": "Chuyển tài khoản",

    // Account
    "Account settings": "Cài đặt tài khoản",

    // Rotur
    "Connect MistWarp to Rotur": "Kết nối MistWarp với Rotur",
    "Reconnect MistWarp to Rotur": "Kết nối lại MistWarp với Rotur",

    // Sign in with Rotur features
    "Save from the File menu": "Lưu từ menu Tệp",
    "and restore old versions later.": "và khôi phục phiên bản cũ sau này.",
    "Open a saved project": "Mở một dự án đã lưu",
    "to your teammates": "cho đồng nghiệp của bạn",
    "from the Tools menu.": "từ menu Công cụ.",
    "Share projects, comment, react, and follow creators.": "Chia sẻ dự án, bình luận, và theo dõi tác giả.",
    "Join studios and challenges, submit entries, and vote.": "Tham gia studio và thử thách, nộp bài, và bầu chọn.",
    "Spaces and challenges": "Không gian và thử thách",
    "Themes and settings sync": "Đồng bộ chủ đề và cài đặt",
    "Your theme and settings follow you to every device.": "Chủ đề và cài đặt của bạn đi theo bạn ở mọi thiết bị.",
    "Show what you're editing": "Hiển thị những gì bạn đang sửa",
    "Share MistWarp activity on your Rotur profile.": "Chia sẻ hoạt động MistWarp trên hồ sơ Rotur của bạn.",
    "Your name in projects": "Tên của bạn trong dự án",
    "The username block and cloud variables use your Rotur name.": "Khối tên người dùng và biến đám mây sử dụng tên Rotur của bạn.",

    // File menu
    "Save to your computer": "Lưu về máy tính của bạn",
    "Save to MistWarp": "Lưu lên MistWarp",
    "Load from your computer": "Tải từ máy tính của bạn",
    "Export > Package project": "Xuất khẩu > Đóng gói dự án",
    "File > Device backups": "Tệp > Bản sao thiết bị",
    "File > Save to your computer": "Tệp > Lưu về máy tĩnh của bạn",
    "File > Export > Package project": "Tệp > Xuất khẩu > Đóng gói dự áp",
};

// Apply translations
const translations = {};
let matched = 0;
let unmatched = [];

for (const key of missingKeys) {
    const enText = defaults[key];
    let viText = null;

    // Try dictionary first
    if (dict[enText]) {
        viText = dict[enText];
        matched++;
    }
    // Try en->vi mapping from upstream
    else if (enToVi[enText]) {
        viText = enToVi[enText];
        matched++;
    }
    // Try matching by key
    else if (dict[key]) {
        viText = dict[key];
        matched++;
    }

    if (viText) {
        translations[key] = viText;
    } else {
        translations[key] = enText; // Fall back to English
        unmatched.push(key);
    }
}

console.log('Total missing keys:', missingKeys.length);
console.log('Translated (dictionary + upstream match):', matched);
console.log('Still English (fallback):', unmatched.length);

// Save the translations
fs.writeFileSync('C:/Users/nbaoh/AppData/Local/Temp/kilo/vi-translations-output.json', JSON.stringify(translations, null, 2));
console.log('Translations written to temp file.');

// Merge into generated-translations.json
genTrans.vi = { ...genVi, ...translations };
fs.writeFileSync('src/lib/tw-translations/generated-translations.json', JSON.stringify(genTrans, null, 2) + '\n');
console.log('Updated generated-translations.json. Total vi entries:', Object.keys(genTrans.vi).length);

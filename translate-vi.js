const fs = require('fs');

// === Bước 1: Nạp tất cả các nguồn bản dịch tiếng Việt có sẵn ===

// Bản dịch tiếng Việt từ thượng nguồn (upstream)
const upstreamSrc = fs.readFileSync(require.resolve('@turbowarp/scratch-l10n/locales/editor-msgs.js'), 'utf8');
const upstream = JSON.parse(upstreamSrc.slice(upstreamSrc.indexOf('{')).replace(/;?\s*$/, ''));
const upstreamVi = upstream.vi || {};
const upstreamEn = upstream.en || {};

// Bản dịch tiếng Việt hiện có trong generated-translations
const genTrans = JSON.parse(fs.readFileSync('src/lib/tw-translations/generated-translations.json', 'utf8'));
const genVi = genTrans.vi || {};

// Các chuỗi mặc định từ mã nguồn MistWarp
const defaults = JSON.parse(fs.readFileSync('src/lib/tw-translations/default-messages.json', 'utf8'));

// Tìm các khóa chưa được dịch
const missingKeys = Object.keys(defaults).filter(k => !(k in upstreamVi) && !(k in genVi));
console.log('Số lượng khóa cần dịch:', missingKeys.length);

// === Bước 2: Thiết lập ánh xạ en -> vi từ tất cả các nguồn ===
const enToVi = {};

// Từ nguồn thượng nguồn (khớp theo chuỗi tiếng Anh)
for (const [id, viText] of Object.entries(upstreamVi)) {
    const enText = upstreamEn[id];
    if (enText && !enToVi[enText]) enToVi[enText] = viText;
}

// Từ genTrans tiếng Việt hiện có
for (const [id, viText] of Object.entries(genVi)) {
    const enText = defaults[id] || upstreamEn[id];
    if (enText && !enToVi[enText]) enToVi[enText] = viText;
}

// === Bước 3: Từ điển dịch trực tiếp các thuật ngữ và ngữ cảnh giao diện ===
const dict = {
    // Thao tác lưu trữ
    "Save": "Lưu",
    "Save as…": "Lưu thành...",
    "Save as": "Lưu thành",
    "Save changes": "Lưu thay đổi",
    "Save to": "Lưu vào",
    "Save to MistWarp": "Lưu lên MistWarp",
    "Save without a version": "Lưu không tạo phiên bản",
    "Create version and save": "Tạo phiên bản mới và lưu",
    "Saving…": "Đang lưu...",
    "Saved": "Đã lưu thành công!",
    "Saving": "Đang lưu",
    "Not saved": "Chưa được lưu!",
    "Unsaved changes": "Có thay đổi chưa được lưu!",
    "Saved to computer": "Đã lưu vào máy tính!",
    "Read-only": "Chỉ đọc",
    "Saving to your computer": "Đang lưu về máy tính của bạn...",
    "Browser autosave is on.": "Tính năng tự động lưu của trình duyệt đang bật!",
    "Browser autosave is off.": "Tính năng tự động lưu của trình duyệt đang tắt!",
    "Remix to MistWarp": "Phối lại lên MistWarp",
    "Upload to TurboWorkshop": "Tải lên TurboWorkshop",
    "{shortcut} saves a copy to your computer instead.": "{shortcut} sẽ lưu một bản sao vào máy tính của bạn!",
    "Creates your own copy of this project on MistWarp.": "Tạo bản sao riêng của bạn cho dự án này trên MistWarp.",
    "Uploads your latest changes to this MistWarp project.": "Tải các thay đổi mới nhất của bạn lên dự án MistWarp này.",
    "Uploads this project to your MistWarp account.": "Tải dự án này lên tài khoản MistWarp của bạn.",
    "Uploads this project to TurboWorkshop.": "Tải dự án này lên hệ thống TurboWorkshop.",
    "Creates your own copy of this project on MistWarp, and turns it in to a full MistWarp project with version history and collaboration.": "Tạo bản sao dự án trên MistWarp, đồng thời chuyển đổi thành dự án MistWarp hoàn chỉnh với lịch sử phiên bản và tính năng cộng tác trực tuyến!",
    "Saves your latest changes. You can still play and share while saving.": "Lưu các thay đổi mới nhất của bạn. Bạn vẫn có thể trải nghiệm và chia sẻ dự án trong lúc lưu!",
    "Uploads your latest changes to this MistWarp project, keeping the same project ID.": "Tải các thay đổi mới nhất lên dự án MistWarp này và giữ nguyên mã định danh dự án.",
    "Uploads this project to your MistWarp account, creating a new project.": "Tải dự án này lên tài khoản MistWarp của bạn dưới dạng một dự án mới hoàn toàn.",
    "Uploads this project to TurboWorkshop, creating a new workshop entry.": "Tải dự án này lên TurboWorkshop dưới dạng một mục nội dung mới.",
    "Creates your own copy of this project on MistWarp, keeping the same project ID and collaborators.": "Tạo bản sao dự án trên MistWarp, giữ nguyên mã định danh dự án và danh sách cộng tác viên.",

    // Thao tác chung
    "Cancel": "Hủy",
    "Close": "Đóng",
    "Delete": "Xóa",
    "Edit": "Chỉnh sửa",
    "Remove": "Xóa bỏ",
    "Add": "Thêm",
    "Open": "Mở",
    "New": "Mới",
    "New window": "Cửa sổ mới",
    "New folder": "Thư mục mới",
    "New group": "Nhóm mới",
    "Create": "Tạo",
    "Export": "Xuất tệp",
    "Import": "Nhập tệp",
    "Copy": "Sao chép",
    "Share": "Chia sẻ",
    "Sign in": "Đăng nhập",
    "Sign in with Rotur": "Đăng nhập bằng Rotur",
    "Sign out": "Đăng xuất",
    "Switch account": "Chuyển đổi tài khoản",
    "Refresh": "Làm mới",
    "Retry": "Thử lại",
    "Try again": "Thử lại",
    "Dismiss": "Bỏ qua",
    "Hide": "Ẩn",
    "Show": "Hiển thị",
    "Undo": "Hoàn tác",
    "Redo": "Làm lại",

    // Danh từ hệ thống
    "Settings": "Cài đặt",
    "Help": "Trợ giúp",
    "About": "Giới thiệu",
    "File": "Tệp",
    "Tools": "Công cụ",
    "Code": "Mã lệnh",
    "Stage": "Sân khấu",
    "Sprites": "Nhân vật",
    "Costumes": "Trang phục",
    "Sounds": "Âm thanh",
    "Scripts": "Kịch bản",
    "Assets": "Tài nguyên",
    "Extension": "Phần mở rộng",
    "Extensions": "Phần mở rộng",
    "Addons": "Tiện ích bổ sung",
    "Debugger": "Công cụ gỡ lỗi",
    "Variable Manager": "Quản lý biến số",
    "Profile": "Hồ sơ cá nhân",
    "Admin": "Quản trị viên",
    "Admin ({count})": "Quản trị viên ({count})",
    "Leaderboard": "Bảng xếp hạng",
    "Wallet": "Ví",
    "Account settings": "Cài đặt tài khoản",
    "Account": "Tài khoản",
    "Products": "Sản phẩm",
    "Game Items": "Vật phẩm trò chơi",
    "Views": "Lượt xem",
    "Feedback": "Phản hồi",
    "Send feedback": "Gửi phản hồi",
    "Documentation": "Tài liệu hướng dẫn",
    "Chat": "Trò chuyện",
    "Notifications": "Thông báo",
    "Analytics": "Thống kê phân tích",
    "Catalog": "Danh mục",
    "Project": "Dự án",

    // Trạng thái hệ thống
    "Error": "Lỗi",
    "Success": "Thành công!",
    "Loading": "Đang tải",
    "Loading…": "Đang tải...",
    "Preparing": "Đang chuẩn bị",
    "Checking": "Đang kiểm tra",
    "Building": "Đang biên dịch",
    "Parsing": "Đang phân tích cú pháp",
    "Downloading": "Đang tải xuống",
    "Uploading": "Đang tải lên",
    "Computing diff…": "Đang so sánh điểm khác biệt...",
    "No extensions loaded": "Chưa có phần mở rộng nào được tải!",
    "1 loaded extension": "1 phần mở rộng đã nạp",
    "{count} loaded extensions": "{count} phần mở rộng đã nạp",

    // Nhãn giao diện
    "Name": "Tên",
    "Title": "Tiêu đề",
    "Description": "Mô tả",
    "Category": "Danh mục",
    "Type": "Loại",
    "All": "Tất cả",
    "None": "Không có",
    "Yes": "Có",
    "No": "Không",
    "On": "Bật",
    "Off": "Tắt",
    "Enable": "Kích hoạt",
    "Disable": "Vô hiệu hóa",
    "Warning": "Cảnh báo!",
    "Info": "Thông tin",
    "Note": "Lưu ý",

    // Cụm thông báo thông dụng
    "Are you sure?": "Bạn có chắc chắn không?",
    "No results": "Không có kết quả!",
    "No results found.": "Không tìm thấy kết quả phù hợp!",
    "No matches found.": "Không tìm thấy kết quả trùng khớp!",
    "No changes.": "Không có thay đổi nào!",
    "No bookmarks yet": "Chưa có dấu trang nào được lưu!",
    "No products available": "Hiện không có sản phẩm nào khả dụng!",
    "No products defined yet": "Chưa có sản phẩm nào được định nghĩa!",
    "No items defined yet": "Chưa có vật phẩm nào được tạo!",
    "No repositories yet.": "Chưa có kho lưu trữ nào!",
    "No conversations yet.": "Chưa có cuộc trò chuyện nào!",
    "No recent fonts": "Không có phông chữ gần đây!",
    "No fonts added yet": "Chưa có phông chữ nào được thêm!",

    // Cộng tác trực tuyến
    "Host": "Chủ phòng",
    "You": "Bạn",
    "Guest": "Khách",
    "Kick": "Mời ra khỏi phòng",
    "Watch": "Theo dõi",
    "Editing": "Đang chỉnh sửa",
    "Watching": "Đang theo dõi",
    "Live collaboration": "Cộng tác trực tuyến",
    "Live session": "Phiên làm việc trực tiếp",
    "Live session available": "Có phiên trực tiếp khả dụng",
    "Session open": "Phiên làm việc đang mở",
    "Online status unavailable": "Trạng thái trực tuyến hiện không khả dụng!",
    "Waiting for the host": "Đang chờ chủ phòng...",
    "Waiting for host": "Đang chờ chủ phòng...",
    "Waiting for the host to come back…": "Đang chờ chủ phòng quay lại...",
    "Waiting for host…": "Đang chờ chủ phòng...",
    "Opening session…": "Đang mở phiên...",
    "Joining session…": "Đang tham gia phiên...",
    "Reconnecting…": "Đang kết nối lại...",
    "Leaving session…": "Đang rời khỏi phiên...",
    "{count} on this branch": "{count} người trên nhánh này",
    "Show current collaborators": "Hiển thị danh sách cộng tác viên hiện tại",
    "Show the message you are replying to": "Hiển thị tin nhắn bạn đang phản hồi",
    "Jump to latest": "Chuyển tới tin nhắn mới nhất",

    // Trò chuyện
    "Direct messages": "Tin nhắn trực tiếp",
    "Conversations": "Cuộc trò chuyện",
    "Message": "Soạn tin nhắn",
    "Send message": "Gửi tin nhắn",
    "Reply": "Trả lời",
    "Delete message": "Xóa tin nhắn",
    "Edit message": "Chỉnh sửa tin nhắn",
    "Message options": "Tùy chọn tin nhắn",
    "Add reaction": "Thêm biểu cảm",
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
    "No content": "Không có nội dung!",
    "Unknown user": "Người dùng không xác định",
    "Jump to the message this replies to": "Chuyển đến tin nhắn gốc",
    "Reveal spoiler": "Hiển thị nội dung ẩn",
    "Chat ({count} new)": "Trò chuyện ({count} tin mới)",
    "Chat spaces": "Không gian trò chuyện",
    "Dock to the side": "Ghim sang bên cạnh",
    "Pop out into a window": "Tách ra cửa sổ riêng",
    "Close chat": "Đóng khung trò chuyện",
    "Leave chat": "Rời khỏi cuộc trò chuyện",

    // Quản lý phiên bản Git
    "Push": "Đẩy lên",
    "Pull": "Kéo về",
    "Clone": "Nhân bản kho",
    "Merge": "Hợp nhất nhánh",
    "Merge from…": "Hợp nhất từ...",
    "Preview": "Xem trước",
    "Restore this commit": "Khôi phục điểm lưu này",
    "Download as .sb3": "Tải xuống dưới định dạng .sb3",
    "Working changes": "Các thay đổi đang thực hiện",
    "Commit message": "Thông điệp ghi nhận thay đổi",
    "Commit": "Ghi nhận thay đổi",
    "Undo last commit": "Hoàn tác lần ghi nhận gần nhất",
    "No uncommitted changes.": "Không có thay đổi nào chưa được ghi nhận!",
    "Danger zone": "Khu vực nguy hiểm",
    "Delete repository": "Xóa kho lưu trữ",
    "Select a file to view its changes.": "Chọn một tệp để kiểm tra các thay đổi.",
    "No changes in this file.": "Không có thay đổi nào trong tệp này!",
    "No uncommitted changes to diff.": "Không có thay đổi nào chưa ghi nhận để so sánh!",
    "No file-level changes to show.": "Không có thay đổi nào ở cấp độ tệp để hiển thị!",
    "Current branch": "Nhánh hiện tại",
    "Create new branch": "Tạo nhánh mới",
    "Create new room": "Tạo phòng mới",
    "Create a room": "Tạo một phòng",
    "Create a repository": "Tạo kho lưu trữ mới",
    "Repository URL": "Đường dẫn kho lưu trữ",
    "Token or password for other services (stored locally)": "Mã xác thực hoặc mật khẩu cho các dịch vụ khác (được lưu cục bộ)",
    "Rotur Git does not need this.": "Hệ thống Rotur Git không yêu cầu mục này.",
    "Connections you add here sync...": "Các kết nối được thêm tại đây sẽ tự động đồng bộ...",
    "Clone an existing project": "Nhân bản một dự án hiện có",
    "This project has no pushed history yet.": "Dự án này chưa có lịch sử tải lên nào!",
    "Start project history": "Khởi tạo lịch sử dự án",
    "Your repositories": "Kho lưu trữ của bạn",
    "Clone any Rotur repo": "Nhân bản kho lưu trữ Rotur bất kỳ",
    "Clone this repo as your project": "Nhân bản kho lưu trữ này làm dự án của bạn",
    "Open on git.rotur.dev": "Mở trên trang git.rotur.dev",
    "Push project to this repo": "Đẩy dự án lên kho lưu trữ này",
    "Sign in with Rotur to create repos...": "Đăng nhập bằng Rotur để khởi tạo kho lưu trữ...",
    "Repo name (required)": "Tên kho lưu trữ (bắt buộc)",

    // Tính năng đăng nhập Rotur
    "Connect MistWarp to Rotur": "Kết nối MistWarp với Rotur",
    "Reconnect MistWarp to Rotur": "Kết nối lại MistWarp với Rotur",
    "Rotur in MistWarp": "Dịch vụ Rotur trong MistWarp",
    "Rotur has a new way to sign in. Reconnect once to stay signed in as {username}.": "Rotur đã cập nhật phương thức đăng nhập mới. Vui lòng kết nối lại một lần để duy trì phiên đăng nhập dưới tên {username}!",
    "Your Rotur account turns these on across MistWarp.": "Tài khoản Rotur sẽ kích hoạt các tính năng này trên toàn bộ MistWarp.",
    "One Rotur account turns these on across MistWarp.": "Chỉ một tài khoản Rotur duy nhất sẽ mở khóa toàn bộ tiện ích này trên MistWarp.",
    "Check your account standing on rotur.dev": "Kiểm tra tình trạng tài khoản của bạn trên trang rotur.dev",
    "You sign in on {link}, so MistWarp never sees your password.": "Bạn thực hiện xác thực trực tiếp trên {link}, do đó MistWarp hoàn toàn không bao giờ nhìn thấy mật khẩu của bạn.",
    "Manage account": "Quản lý tài khoản",
    "Not now": "Để sau",
    "Waiting for Rotur...": "Đang chờ Rotur phản hồi...",
    "Reconnect": "Kết nối lại",
    "Continue with Rotur": "Tiếp tục bằng Rotur",
    "Sign in to create repos on git.rotur.dev and push your project straight from MistWarp.": "Đăng nhập để tạo kho lưu trữ trên git.rotur.dev và đẩy dự án của bạn trực tiếp từ MistWarp!",
    "Save from the File menu and restore old versions later.": "Lưu trực tiếp từ trình đơn Tệp và khôi phục các phiên bản cũ bất cứ lúc nào.",
    "Open a saved project to your teammates from the Tools menu.": "Chia sẻ dự án đã lưu cho các thành viên trong nhóm từ trình đơn Công cụ.",
    "Share projects, comment, react, and follow creators.": "Chia sẻ dự án, bình luận, tương tác và theo dõi các nhà sáng tạo.",
    "Join studios and challenges, submit entries, and vote.": "Tham gia các xưởng sáng tạo và thử thách, nộp bài dự thi và bình chọn.",
    "Themes and settings sync": "Đồng bộ giao diện và cài đặt",
    "Your theme and settings follow you to every device.": "Giao diện và cài đặt cá nhân sẽ theo bạn trên mọi thiết bị.",
    "Show what you're editing": "Hiển thị nội dung bạn đang chỉnh sửa",
    "Share MistWarp activity on your Rotur profile.": "Chia sẻ hoạt động MistWarp trên trang cá nhân Rotur của bạn.",
    "Your name in projects": "Tên của bạn trong các dự án",
    "The username block and cloud variables use your Rotur name.": "Khối lệnh tên người dùng và các biến đám mây sẽ sử dụng tên Rotur của bạn.",
    "Publish and remix": "Đăng tải và phối lại",
    "Spaces and challenges": "Không gian sáng tạo và thử thách",
    "Save from the File menu": "Lưu từ trình đơn Tệp",
    "and restore old versions later.": "và khôi phục lại các phiên bản cũ sau này.",
    "Open a saved project": "Mở một dự án đã lưu",
    "to your teammates": "cho các thành viên trong nhóm của bạn",
    "from the Tools menu.": "từ trình đơn Công cụ.",

    // Quản lý sản phẩm và quyền sở hữu
    "Grant to Username": "Cấp quyền cho tên người dùng",
    "Grant": "Cấp quyền",
    "Revoke": "Thu hồi quyền",
    "Revoke live ownership": "Thu hồi quyền sở hữu trực tiếp",
    "Revoke from Username": "Thu hồi quyền từ tên người dùng",
    "Confirm revoke": "Xác nhận thu hồi quyền",
    "Without refund": "Không hoàn tiền",
    "Select Product": "Chọn sản phẩm",
    "Product Catalog": "Danh mục sản phẩm",
    "Users who own \"{productName}\" ({count})": "Những người dùng sở hữu \"{productName}\" ({count})",
    "No users currently own this product.": "Hiện chưa có người dùng nào sở hữu sản phẩm này!",
    "Enter a username above to grant ownership.": "Nhập tên người dùng ở trên để cấp quyền sở hữu.",
    "Project not saved to MistWarp yet": "Dự án hiện chưa được lưu lên MistWarp!",
    "User Entitlements": "Quyền hạn của người dùng",

    // Vật phẩm trò chơi
    "Edit Item": "Chỉnh sửa vật phẩm",
    "Add New Item": "Thêm vật phẩm mới",
    "Item Name": "Tên vật phẩm",
    "Item ID (slug)": "Mã định danh vật phẩm",
    "Item Image (compressed)": "Hình ảnh vật phẩm (đã nén)",
    "Awardable by game code": "Có thể trao thưởng bằng mã lệnh",
    "Blocks can give this item to players": "Các khối lệnh có thể trao vật phẩm này cho người chơi",
    "Click Add Item to create collectables...": "Nhấp Thêm vật phẩm để tạo các vật phẩm có thể thu thập...",
    "Collectable Items": "Các vật phẩm có thể thu thập",
    "Add Item": "Thêm vật phẩm",
    "Add Item button": "Nút thêm vật phẩm",

    // Quản lý tệp tài nguyên
    "No preview available": "Không có bản xem trước!",
    "Select a file to preview it": "Chọn một tệp để xem trước nội dung.",
    "Add files": "Thêm tệp",
    "Folder name": "Tên thư mục",
    "Are you sure you want to delete \"{asset}\"? Blocks that use it will stop working.": "Bạn có chắc chắn muốn xóa tệp \"{asset}\" không? Các khối lệnh đang dùng tệp này sẽ ngừng hoạt động!",
    "Drop files here, paste them, or click Add files. Assets cost nothing until a block loads them.": "Kéo thả tệp vào đây, dán từ bảng nhớ tạm hoặc nhấp Thêm tệp. Tài nguyên không làm tốn dung lượng cho đến khi có khối lệnh tải chúng.",
    "Adding to {folder}": "Đang thêm vào thư mục {folder}...",

    // Hướng dẫn mở đầu
    "Getting started": "Bắt đầu",
    "Make your first project": "Tạo dự án đầu tiên của bạn",
    "Start from a small working project and change it, or open a project from your computer.": "Bắt đầu chỉnh sửa từ một dự án mẫu đang hoạt động, hoặc mở tệp dự án trực tiếp từ máy tính của bạn.",
    "Open a file": "Mở tệp",
    "Open your own file": "Mở tệp từ máy tính của bạn",
    "Dismiss starter guide": "Bỏ qua hướng dẫn",
    "Starter project guide": "Hướng dẫn dự án mẫu",
    "Press {shortcut} to search every command.": "Nhấn {shortcut} để tìm kiếm mọi lệnh nhanh chóng.",

    // Thống kê tương tác
    "Watchers": "Người theo dõi",
    "Loves": "Lượt thích",
    "Faves": "Lượt yêu thích",
    "Remixes": "Bản phối lại",

    // Điều khiển sân khấu và ghi hình
    "Take stage screenshot": "Chụp màn hình sân khấu",
    "Mute project": "Tắt âm thanh dự án",
    "Unmute project": "Bật lại âm thanh dự án",
    "Project volume": "Âm lượng dự án",
    "Stage screenshot": "Ảnh chụp màn hình sân khấu",
    "Screenshot copied to clipboard.": "Ảnh chụp màn hình đã được sao chép vào bảng nhớ tạm!",
    "Screenshot taken, but your browser did not allow copying it to the clipboard.": "Đã chụp màn hình, nhưng trình duyệt của bạn không cho phép sao chép tự động vào bảng nhớ tạm!",
    "Resize chat": "Thay đổi kích thước khung trò chuyện",
    "{count} of {max} clones. The clone limit has been reached.": "{count} trên tối đa {max} bản sao. Dự án đã chạm mức giới hạn bản sao!",
    "{count, plural, one {# clone} other {# clones}}": "{count, plural, one {# bản sao} other {# bản sao}}",

    // Thông báo lỗi
    "Could not save MistWarp project: {error}": "Không thể lưu dự án MistWarp: {error}!",
    "Could not load project": "Không thể tải dự án!",
    "Check your connection and try again.": "Vui lòng kiểm tra lại kết nối mạng và thử lại!",
    "Could not connect to chat.": "Không thể kết nối đến máy chủ trò chuyện!",
    "The editor ran into a problem and stopped.": "Trình biên tập đã gặp sự cố và phải dừng hoạt động!",
    "The project could not be downloaded.": "Không thể tải xuống tệp dự án!",
    "Download failed": "Tải xuống thất bại!",
    "Push failed. {error}": "Đẩy lên thất bại: {error}!",
    "Pull failed. {error}": "Kéo về thất bại: {error}!",
    "Commit failed. {error}": "Ghi nhận thay đổi thất bại: {error}!",
    "Could not start a new project. Your current project is still open.": "Không thể bắt đầu dự án mới do dự án hiện tại của bạn vẫn đang mở!",
    "There are no new changes to save.": "Không có thay đổi mới nào để thực hiện lưu!",

    // Cửa sổ chia sẻ
    "Open project page": "Mở trang dự án",
    "Use current canvas": "Sử dụng khung hình hiện tại",
    "Upload an image": "Tải lên hình ảnh",
    "Remix": "Phối lại",
    "Update": "Cập nhật",
    "For example: Added a new level": "Ví dụ: Đã thêm một màn chơi mới",

    // Trình đơn Tệp và Đóng gói
    "Save to your computer": "Lưu về máy tính của bạn",
    "File > Save to your computer": "Tệp > Lưu về máy tính của bạn",
    "File > Export > Package project": "Tệp > Xuất tệp > Đóng gói dự án",
    "File > Device backups": "Tệp > Bản sao lưu trên thiết bị",
    "Export > Package project": "Xuất tệp > Đóng gói dự án",
    "Package project": "Đóng gói dự án",
    "Load from your computer": "Tải lên từ máy tính của bạn",
    "Load project": "Tải tệp dự án",

    // Bổ sung các chuỗi liên kết
    "Sign in to create": "Đăng nhập để khởi tạo",
    "Sign in to": "Đăng nhập để",
    "Follow MistWarp on GitHub": "Theo dõi MistWarp trên GitHub",
    "Project Video Recorder": "Bộ ghi hình video dự án"
};

// Áp dụng bản dịch
const translations = {};
let matched = 0;
let unmatched = [];

for (const key of missingKeys) {
    const enText = defaults[key];
    let viText = null;

    // Ưu tiên tra từ điển trực tiếp
    if (dict[enText]) {
        viText = dict[enText];
        matched++;
    }
    // Tra ánh xạ en -> vi từ thượng nguồn
    else if (enToVi[enText]) {
        viText = enToVi[enText];
        matched++;
    }
    // Khớp theo tên khóa
    else if (dict[key]) {
        viText = dict[key];
        matched++;
    }

    if (viText) {
        translations[key] = viText;
    } else {
        translations[key] = enText; // Dự phòng giữ nguyên tiếng Anh nếu chưa có
        unmatched.push(key);
    }
}

console.log('Tổng số khóa còn thiếu:', missingKeys.length);
console.log('Đã dịch thành công (từ điển + khớp thượng nguồn):', matched);
console.log('Khóa chưa có bản dịch (dự phòng tiếng Anh):', unmatched.length);

// Lưu kết quả dịch vào tệp tạm
fs.writeFileSync('C:/Users/nbaoh/AppData/Local/Temp/kilo/vi-translations-output.json', JSON.stringify(translations, null, 2));
console.log('Đã xuất bản dịch ra tệp tạm thời!');

// Hợp nhất vào generated-translations.json
genTrans.vi = { ...genVi, ...translations };
fs.writeFileSync('src/lib/tw-translations/generated-translations.json', JSON.stringify(genTrans, null, 2) + '\n');
console.log('Đã cập nhật generated-translations.json. Tổng số mục tiếng Việt:', Object.keys(genTrans.vi).length);